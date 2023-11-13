from rest_framework import serializers
from apps.core.models.coleccion_producto import ColeccionProducto
from apps.core.serializers.producto import ProductoSerializer
from apps.core.serializers.coleccion import ColeccionSerializer


#✅
class ColeccionProductoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()
    coleccion = ColeccionSerializer()

    class Meta: 
        model = ColeccionProducto
        fields = ['id','producto', 'coleccion']