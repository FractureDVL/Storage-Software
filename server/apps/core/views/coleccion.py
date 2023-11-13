from rest_framework.viewsets import ModelViewSet
from apps.core.models.coleccion_producto import ColeccionProducto
from apps.core.serializers.coleccion_producto import ColeccionProductoSerializer


#✅
class ColeccionProductoViewSet(ModelViewSet):
    model = ColeccionProducto
    serializer_class = ColeccionProductoSerializer
    queryset = ColeccionProducto.objects.all()


#TODO filtrar por coleccion