from rest_framework import permissions

class SafeMethodsPermission(permissions.BasePermission):
    """
    Custom permission to check whether the user is authenticated and can perform the requested action.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # Los métodos seguros (GET, HEAD, OPTIONS) están permitidos para todos.
            return True
        elif request.method == 'POST' and request.user.is_authenticated:
            # Para las solicitudes POST, solo permitir si el usuario está autenticado.
            return True
        else:
            return False