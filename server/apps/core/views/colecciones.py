from rest_framework.viewsets import ModelViewSet
from apps.core.models.coleccion import Coleccion
from apps.core.serializers.coleccion import ColeccionSerializer


#✅
class ColeccionViewSet(ModelViewSet):
    model = Coleccion
    serializer_class = ColeccionSerializer
    queryset = Coleccion.objects.all()