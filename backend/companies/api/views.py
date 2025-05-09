from fileinput import filename
from django.http import HttpResponse
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.mail import EmailMessage

from companies.api.permissions import IsAdminOrReadOnly, IsSuperOrReadOnly
from companies.api.serializers import CompanieSerializer
from companies.models import Companie
from products.api.serializers import ProductListSerializer
from products.models import Product
from reportlab.pdfgen import canvas

from companies.utils import get_products, render_to_pdf, render_to_pdf_2, send_pdf_email


class CompanieApiViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Companie.objects.all()
    serializer_class = CompanieSerializer
    queryset = Companie.objects.all()
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['name']

class ProductCompanieView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    def get(self, request, nit):
        try:
            company = Companie.objects.get(nit=nit)
        except Companie.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        
        products = company.products.all()
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)
    
class ExportProductsPDF(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request, nit=None):
        try:
            data = get_products(nit)
        except Companie.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        pdf = render_to_pdf_2('home/products-company.html', data)
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="products_report.pdf"'
        
        return response

class SendProductsReportEmail(APIView):
    # permission_classes = [IsAdminOrReadOnly]

    def post(self, request):
        email = request.data.get('email')
        nit = request.data.get('nit')

        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            data = get_products(nit)
        except Companie.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        
        pdf = render_to_pdf('home/products-company.html', data)

        if pdf:
            send_pdf_email(pdf, email)
            return Response({"message": f"Report sent to {email}"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Error when generating the PDF"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
