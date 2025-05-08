from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from companies.api.permissions import IsAdminOrReadOnly, IsSuperOrReadOnly
from companies.api.serializers import CompanieSerializer
from companies.models import Companie


class CompanieApiViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Companie.objects.all()
    serializer_class = CompanieSerializer
    queryset = Companie.objects.all()
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['name']