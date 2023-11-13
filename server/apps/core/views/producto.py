from django.forms import ValidationError
from rest_framework.viewsets import ModelViewSet
from apps.core.models.categoria import Categoria
from apps.core.models.producto import Producto
from apps.core.serializers.producto import ProductoSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

#✅
class ProductoViewSet(ModelViewSet):
    model= Producto
    serializer_class = ProductoSerializer
    def get_queryset(self):
        # Filtrar solo los productos activos
        return Producto.objects.filter(estado=True)
    http_method_names = ['get']
        
        
        