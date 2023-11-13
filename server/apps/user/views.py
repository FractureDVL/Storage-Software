from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from apps.user.serializers.user import UserSerializer
from rest_framework.permissions import IsAuthenticated

# Usuarios CRUD
class UserViewSet(ModelViewSet):
    queryset =  User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [ IsAuthenticated ]
    
    def get_queryset(self):
        queryset = User.objects
        user_id = self.request.user.id
        user_info = self.request.user.information.user_type
        queryset = queryset.filter(id=user_id)
        
        return queryset