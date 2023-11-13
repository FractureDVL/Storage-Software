from rest_framework import serializers
from apps.core.models.producto import Producto


# Request ---> serializador ---> Modelo - BD
class ProductoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio', 'categoria', 'estado', 'image', 'coleccion', 'descuento']