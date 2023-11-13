from rest_framework import serializers
from apps.core.models.nosotros import Nosotros


# Request ---> serializador ---> Modelo - BD
class NosotrosSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Nosotros
        fields = ['id', 'titulo', 'descripcion', 'image']