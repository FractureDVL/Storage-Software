from rest_framework import serializers
from apps.core.models.historial import ProductoPedido
from apps.core.models.historial import Pedido
from apps.core.models.historial import Historial


class ProductoPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoPedido
        fields = ['pedido', 'producto', 'precio', 'cantidad', 'talla']

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['id','fecha', 'usuario', 'estado', 'precio_total', 'empresa_envio', 'numero_guia']

class HistorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historial
        fields = ['']
