"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from drf_yasg.views import get_schema_view
from django.conf.urls.static import static
from drf_yasg import openapi

from backend import settings
from companies.api.router import router_companies
from products.api.router import router_products

schema_view = get_schema_view(
   openapi.Info(
      title="lite thinking API Rest",
      default_version='v1',
      description="Documentacion prueba técnica lite thinking Api Rest",
      terms_of_service="",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
#    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/', include('users.api.router')),
    path('api/', include(router_companies.urls)),
    path('api/', include(router_products.urls)),
    path('api/', include('companies.api.router')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
