from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django_google_maps import fields as map_fields


class Rental(models.Model):
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('donor', 'Donor'),
        ('hospital', 'Hospital'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True,
        help_text="Os grupos aos quais este usuário pertence.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
        help_text="Permissões específicas para este usuário.",
        verbose_name="user permissions",
    )


class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100, blank=True, null=True)
    blood_type = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    sex = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    last_donation_date = models.DateField(null=True, blank=True)
    created_at = models.DateField('Criação', auto_now_add=True)
      
    class Meta:
        verbose_name = 'Doador'


class Hospital(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    created_at = models.DateField('Criação', auto_now_add=True)


class BloodStock(models.Model):
    blood_type = models.CharField(max_length=100)
    amount = models.DecimalField(decimal_places=2, max_digits=6)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    created_at = models.DateField('Criação', auto_now_add=True)
      
    class Meta:
        verbose_name = 'Estoque de Sangue'


class DonationSchedule(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    scheduling_date = models.DateField()
    created_at = models.DateField('Criação', auto_now_add=True)
      
    class Meta:
        verbose_name = 'Agendamento Doação'
        
        
class Donation(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    scheduling = models.ForeignKey(DonationSchedule, on_delete=models.CASCADE)
    created_at = models.DateField('Criação', auto_now_add=True)
      
    class Meta:
        verbose_name = 'Doação'
