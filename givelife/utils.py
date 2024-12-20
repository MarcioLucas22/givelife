from django.db.models import Count, Sum
from .models import Hospital, BloodStock, DonationSchedule, Donor
from django.db.models.functions import TruncMonth
import requests


def get_gender_percentage(hospital_user):
    hospital = Hospital.objects.get(user=hospital_user)

    unique_donors = DonationSchedule.objects.filter(hospital=hospital).values('donor').distinct()

    total_donors = unique_donors.count()

    if total_donors == 0:
        return {'male_percentage': 0, 'female_percentage': 0}

    gender_counts = (
        Donor.objects.filter(id__in=unique_donors.values('donor'))
        .values('sex')
        .annotate(count=Count('sex'))
    )

    percentages = {}
    for gender in gender_counts:
        if gender['sex'] == 'Masculino':
            percentages['male_percentage'] = round((gender['count'] / total_donors) * 100)
        elif gender['sex'] == 'Feminino':
            percentages['female_percentage'] = round((gender['count'] / total_donors) * 100)

    percentages.setdefault('male_percentage', 0)
    percentages.setdefault('female_percentage', 0)

    return percentages


def get_monthly_donations(hospital):
    monthly_donations = list(
        BloodStock.objects.filter(hospital=hospital)
        .annotate(month=TruncMonth('created_at'))
        .values('month')
        .annotate(total_donations=Sum('amount'))
        .order_by('month')
    )

    donations_by_month = {
        "JAN": 0, "FEV": 0, "MAR": 0, "ABR": 0,
        "MAI": 0, "JUN": 0, "JUL": 0, "AGO": 0,
        "SET": 0, "OUT": 0, "NOV": 0, "DEZ": 0,
    }

    month_mapping = {
        'Jan': 'JAN', 'Feb': 'FEV', 'Mar': 'MAR', 'Apr': 'ABR',
        'May': 'MAI', 'Jun': 'JUN', 'Jul': 'JUL', 'Aug': 'AGO',
        'Sep': 'SET', 'Oct': 'OUT', 'Nov': 'NOV', 'Dec': 'DEZ',
    }

    for entry in monthly_donations:
        month_name = entry['month'].strftime('%b')
        mapped_month = month_mapping.get(month_name, month_name).upper()
        donations_by_month[mapped_month] = float(entry['total_donations'])

    return donations_by_month


def get_coordinates(address, api_key):
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": api_key
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data['status'] == 'OK':
            location = data['results'][0]['geometry']['location']
            return location['lat'], location['lng']
        else:
            raise Exception(f"Geocoding API error: {data['status']}")
    else:
        raise Exception(f"HTTP error: {response.status_code}")
