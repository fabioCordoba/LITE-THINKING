from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from companies.api.permissions import IsAdminOrReadOnly, IsSuperOrReadOnly
from companies.api.serializers import CompanieSerializer
from companies.models import Companie
from products.api.serializers import ProductListSerializer
from products.models import Product


class CompanieApiViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Companie.objects.all()
    serializer_class = CompanieSerializer
    queryset = Companie.objects.all()
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['name']

class ProductCompanieView(APIView):
    # permission_classes = [IsAdminOrReadOnly]
    def get(self, request, nit):
        try:
            print(str(nit))
            company = Companie.objects.get(nit=nit)
        except Companie.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        
        products = company.products.all()
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)