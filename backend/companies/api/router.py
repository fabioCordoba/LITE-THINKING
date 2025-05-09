from django.urls import path
from rest_framework.routers import DefaultRouter

from companies.api.views import CompanieApiViewSet, ExportProductsPDF, ProductCompanieView

router_companies = DefaultRouter()

router_companies.register(prefix='companies', basename='companies', viewset=CompanieApiViewSet)
urlpatterns = [
    path('companies/<str:nit>/products', ProductCompanieView.as_view()),
    path('companies/<str:nit>/export-products-pdf/', ExportProductsPDF.as_view(), name='export-products-pdf'),
    path('companies/export', ExportProductsPDF.as_view(), name='export'),

]
