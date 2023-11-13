
from rest_framework.viewsets import ModelViewSet
from apps.core.models.categoria import Categoria
from apps.core.serializers.categoria import CategoriaSerializer
from rest_framework.permissions import AllowAny

class CategoriaViewSet(ModelViewSet):
    model = Categoria
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]
    queryset = Categoria.objects.all()
