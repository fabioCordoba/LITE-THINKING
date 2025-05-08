from django.urls import path
from rest_framework.routers import DefaultRouter

from companies.api.views import CompanieApiViewSet

router_companies = DefaultRouter()

router_companies.register(prefix='companies', basename='companies', viewset=CompanieApiViewSet)
