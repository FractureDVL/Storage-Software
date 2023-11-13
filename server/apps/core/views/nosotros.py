from django.forms import ValidationError
from rest_framework.viewsets import ModelViewSet
from apps.core.models.nosotros import Nosotros
from apps.core.serializers.nosotros import NosotrosSerializer

class NosotrosViewSet(ModelViewSet):
    model= Nosotros
    serializer_class = NosotrosSerializer
    queryset = Nosotros.objects.all()
    http_method_names = ['get']