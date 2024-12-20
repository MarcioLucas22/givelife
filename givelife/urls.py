from django.urls import path
from .views import IndexView, AgendamentoView, CadastrointuView, CadastroView, LoginView, InformacoesDoacaoView, DoadorView, LogoutView, PassosView, DashView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('cadastro', CadastroView.as_view(), name='cadastro'),
    path('cadastroIntu', CadastrointuView.as_view(), name='cadastroIntu'),
    path('agendamento', AgendamentoView.as_view(), name='agendamento'),    
    path('login', LoginView.as_view(), name='login'),
    path('doador', DoadorView.as_view(), name='doador'),
    path('informacoes-doacao', InformacoesDoacaoView.as_view(), name='informacoes-doacao'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('informacoes-doacao', InformacoesDoacaoView.as_view(), name='informacoes-doacao'),
    path('passos', PassosView.as_view(), name='passos'),
    path('dash', DashView.as_view(), name='dash'),
]