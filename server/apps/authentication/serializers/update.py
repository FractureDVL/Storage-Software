from rest_framework import serializers
from django.contrib.auth.models import User
from apps.user.serializers.user import UserSerializer
from apps.user.models.information import UserInformationModel

from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password


class UserInformationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInformationModel
        fields = ['address']

permission_classes = [IsAuthenticated]
class UpdateUserSerializer(serializers.ModelSerializer):
    information = UserInformationModelSerializer(required=False)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'information']

    def validate_email(self, value):
        # Validar si el correo electrónico ya está en uso por otro usuario
        if User.objects.exclude(pk=self.instance.pk).filter(email=value).exists():
            raise serializers.ValidationError('Correo electrónico ya está en uso.')
        return value

    def update(self, instance, validated_data):
        # Actualizar campos del usuario
        for key, value in validated_data.items():
            if key == 'information':
                # Manejar la creación o actualización de UserInformationModel
                information_data = value
                information_instance, created = UserInformationModel.objects.get_or_create(
                    user=instance,
                    defaults=information_data
                )
                if not created:
                    # Si ya existe, actualiza los campos
                    for field, val in information_data.items():
                        setattr(information_instance, field, val)
                    information_instance.save()

                # Asignar la instancia de UserInformationModel al usuario
                setattr(instance, key, information_instance)
            else:
                setattr(instance, key, value)

        instance.username = validated_data.get('email', instance.username)
        instance.save()
        return instance