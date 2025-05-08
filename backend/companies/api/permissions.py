from rest_framework.permissions import BasePermission
from companies.models import Companie


class IsSuperOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        else:
            return request.user.is_staff
        
class IsGuestOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True 
        return request.user.rol == 'guest'
    
class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True 
        return request.user.rol == 'administrator'