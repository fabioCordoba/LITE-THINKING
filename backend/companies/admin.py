from django.contrib import admin
from companies.models import Companie

@admin.register(Companie)
class CompanieAdmin(admin.ModelAdmin):
    list_display = ['nit', 'name', 'address', 'phone']