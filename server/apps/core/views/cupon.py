from django.forms import ValidationError
from rest_framework.viewsets import ModelViewSet
from apps.core.models.cupon import Cupon
from apps.core.serializers.cupon import CuponSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from datetime import date
from apps.core.models.cupon import CuponUtilizado
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

#✅
class CuponViewSet(ModelViewSet):
    model= Cupon
    serializer_class = CuponSerializer
    queryset = Cupon.objects.all()
    permission_classes = [IsAuthenticated]
    @action(detail=False, methods=['post'], url_path='validar-cupon')
    def validarCupon(self, request):
        try:
            #obtiene
            cupon = self.request.data.get('cupon')
            if not cupon:
                return Response({'cupon': 'El cupon es necesario.'}, status=status.HTTP_400_BAD_REQUEST)
            if not isinstance(cupon, str):
                return Response({'cupon': 'El cupon no es valido'}, status=status.HTTP_400_BAD_REQUEST)
            cupon = Cupon.objects.get(cupon=cupon)
            if cupon:
                if cupon.vencimiento < date.today():
                    return Response({'mensaje': 'El cupon esta vencido.'})
                else:
                    if CuponUtilizado.objects.filter(usuario=User.objects.get(pk=self.request.user.id), cupon=cupon).exists():
                        return Response({'mensaje': 'Ya ha utilizado este cupon'}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response({'datos':{
                        'mensaje':f'El cupon {cupon.cupon} es valido.',
                        'descuento': cupon.descuento
                }})
        except Cupon.DoesNotExist:
            return Response({'mensaje': 'El cupon no existe.'})
            
