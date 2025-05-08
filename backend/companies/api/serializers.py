from rest_framework import serializers
from companies.models import Companie
from products.models import Product
from users.models import User


class CompanieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companie
        fields = ['nit', 'name', 'address', 'phone']

