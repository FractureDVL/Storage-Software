from rest_framework import serializers
from apps.core.models.coleccion import Coleccion


# Request ---> serializador ---> Modelo - BD
class ColeccionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Coleccion
        fields = ['id', 'coleccion']