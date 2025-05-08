from rest_framework import serializers
from products.models import Product
from users.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['code', 'name', 'characteristics', 'prices', 'company']

class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['code', 'name', 'characteristics', 'prices']

