from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_name'] = user.user_name
        token['email'] = user.email
        return token

    def validate(self, attrs):
        email = attrs.get("username")
        password = attrs.get("password")
        print(f'{email} {password} 🍔')
        try:
            user = User.objects.get(email=email)
            print(f'{user} 🥳')
            if user.is_active and user.check_password(password):
                refresh = RefreshToken.for_user(user)
                response_data = {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }
                return response_data
            elif not user.is_active:
                raise exceptions.AuthenticationFailed('La cuenta está inactiva o bloqueada. Por favor, contacta al soporte.')
            else:
                raise exceptions.AuthenticationFailed('Las credenciales proporcionadas son incorrectas.')
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('No existe ningún usuario registrado con el correo electrónico proporcionado.')
