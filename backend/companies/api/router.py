from django.urls import path
from rest_framework.routers import DefaultRouter

from companies.api.views import CompanieApiViewSet, ProductCompanieView

router_companies = DefaultRouter()

router_companies.register(prefix='companies', basename='companies', viewset=CompanieApiViewSet)
urlpatterns = [
    path('companies/<str:nit>/products', ProductCompanieView.as_view()),
]
