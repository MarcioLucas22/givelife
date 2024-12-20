from django.shortcuts import render
from django.views.generic import TemplateView
from django.views import View
from .models import Donor, Hospital, User, DonationSchedule, BloodStock
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.db import connection
from django.http import HttpResponseForbidden
from .utils import get_gender_percentage, get_monthly_donations, get_coordinates
from django.db.models import Sum
import json
from django.core.serializers.json import DjangoJSONEncoder
from app import settings

class IndexView(TemplateView):
    template_name = 'index.html'


class CadastroView(View):
    def get(self, request):
        return render(request, 'cadastro.html')

    def post(self, request):
        name = request.POST['name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        phone = request.POST['phone']
        blood_type = request.POST['blood_type']
        sex = request.POST['sex']
        password = request.POST['password']

        user = User.objects.create_user(
            username=email, 
            email=email, 
            password=password,
            first_name=name,
            last_name=last_name,
            user_type='donor'
        )

        Donor.objects.create(
            user=user,
            name=name, 
            last_name=last_name,
            email=email, 
            phone=phone, 
            blood_type=blood_type, 
            sex=sex,
            password=password
        )
        
        return redirect('login')


class CadastrointuView(TemplateView):
    def get(self, request):
        return render(request, 'cadastroIntu.html')

    def post(self, request):
        name = request.POST['name']
        email = request.POST['email']
        phone = request.POST['phone']
        address = request.POST['address']
        cnpj = request.POST['cnpj']
        password = request.POST['password']

        user = User.objects.create_user(
            username=name,
            email=email,
            password=password,
            first_name=name,
            user_type='hospital'
        )

        Hospital.objects.create(
            user=user,
            name=name,
            email=email,
            phone=phone,
            address=address,
            cnpj=cnpj,
            password=password
        )

        return redirect('login')


class AgendamentoView(View):
    def get(self, request):
        if not self.request.user.is_authenticated:
            return HttpResponseForbidden("Você precisa estar logado para acessar esta página.")
        
        hospitals = Hospital.objects.all()
        scheduling = []

        user = self.request.user
        donor_id = Donor.objects.get(user=user).pk
        with connection.cursor() as cursor:
            cursor.execute(f'SELECT * FROM givelife_donationschedule WHERE donor_id = {donor_id}')
            rows = cursor.fetchall() 
            for row in rows:
                hospital_id = row[4]
                scheduling_date = row[1]

                hospital = Hospital.objects.get(pk=hospital_id)
                scheduling.append({
                    'date': scheduling_date,
                    'hospital_name': hospital.name
                })
            
        return render(request, 'agendamento.html', {
            'hospitals': hospitals, 
            'scheduling': scheduling,
        })


    def post(self, request):
        hospital_id = request.POST['centroDoacao']
        scheduling_date = request.POST['data']

        user = self.request.user
        blood_type = Donor.objects.get(user=user).blood_type
        hospital = Hospital.objects.get(pk=hospital_id)

        try:
            hospital = Hospital.objects.get(id=hospital_id)
            DonationSchedule.objects.create(
                donor=request.user.donor,
                hospital=hospital,
                scheduling_date=scheduling_date,
            )

            BloodStock.objects.create(
                blood_type=blood_type,
                amount=1,
                hospital=hospital
            )

            return redirect('agendamento')
        except Hospital.DoesNotExist:
            return render(request, 'agendamento.html', {
                'error': 'Centro de doação não encontrado',
                'hospitals': Hospital.objects.all()
            })


class LoginView(TemplateView):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            if user.user_type == 'donor':
                return redirect('doador') 
            elif user.user_type == 'hospital':
                return redirect('dash')
        else:
            return render(request, 'login.html', {'error': 'Login e senha inválidas.'})
        

class LogoutView(View):
    def post(self, request):
        logout(request)
        return redirect('login')


class InformacoesDoacaoView(TemplateView):
    template_name = 'informacoes-doacao.html'


class DoadorView(TemplateView):
    # API_KEY = settings.GOOGLE_MAPS_API_KEY
    
    def get(self, request):
        # # print(get_coordinates('Rua plêiades 451, Santa lúcia', self.API_KEY))
        # context = {
        #     'GOOGLE_MAPS_API_KEY': self.API_KEY,
        # }
        return render(request, 'doador.html') #context
    



class PassosView(TemplateView):
    template_name = 'passos.html'

class DashView(TemplateView):
    def get(self, request):
        if not self.request.user.is_authenticated:
            return HttpResponseForbidden("Você precisa estar logado para acessar esta página.")
        
        hospital_user = self.request.user
        male_gender_percentage = get_gender_percentage(hospital_user)['male_percentage']
        female_gender_percentage = get_gender_percentage(hospital_user)['female_percentage']

        hospital = Hospital.objects.get(user=hospital_user)
        
        total_amount = BloodStock.objects.filter(hospital=hospital).aggregate(total=Sum('amount'))['total']
        total_amount = 0 if total_amount == None else total_amount
        blood_stock = list(
            BloodStock.objects.filter(hospital=hospital)
            .values('blood_type')
            .annotate(total_amount=Sum('amount'))
        )

        return render(request, 'dash.html', {
            'male_gender_percentage': male_gender_percentage,
            'female_gender_percentage': female_gender_percentage,
            'total_amount': total_amount,
            'blood_stock': json.dumps(blood_stock, cls=DjangoJSONEncoder),
            'monthly_donations': json.dumps(get_monthly_donations(hospital), cls=DjangoJSONEncoder)
        })