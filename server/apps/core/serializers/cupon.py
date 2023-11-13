from rest_framework import serializers
from apps.core.models.cupon import Cupon, CuponUtilizado

class CuponSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Cupon
        fields = ['id', 'cupon', 'descuento', 'vencimiento']

class CuponUtilizadoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CuponUtilizado
        fields = ['id', 'cupon', 'usuario', 'pedido']
