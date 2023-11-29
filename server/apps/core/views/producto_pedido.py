from rest_framework.viewsets import ModelViewSet
from apps.core.models.historial import ProductoPedido
from apps.core.models.historial import Pedido
from apps.core.models.historial import Historial
from apps.core.serializers.producto_pedido import ProductoPedidoSerializer
from apps.core.serializers.producto_pedido import PedidoSerializer
from apps.core.serializers.producto_pedido import HistorialSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from datetime import date
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from apps.core.models.producto import Producto
from apps.core.serializers.producto import ProductoSerializer
from apps.core.models.cupon import CuponUtilizado, Cupon

from rest_framework import viewsets
from rest_framework.response import Response
from django.http import HttpResponse

#pedido, producto, precio, cantidad, talla
class ProductoPedidoViewSet(ModelViewSet):
    model = ProductoPedido
    serializer_class = ProductoPedidoSerializer
    queryset = ProductoPedido.objects.all()

    permission_classes = [IsAuthenticated]
    @action(detail=False, methods=['post'], url_path='agregar-producto')
    def agregarProductos(self, request):
        productos = self.request.data.get('productos')
        #productos = request.data.get('productos', [])

        if not productos:
            return Response({'mensaje': 'No se encuentran productos en el carrito'}, status=status.HTTP_400_BAD_REQUEST)

        cupon_codigo = self.request.data.get('cupon')
        descuento = 0
        if not cupon_codigo:
            descuento = 0
            cupon_objeto = ""
        else: 
            if not Cupon.objects.filter(cupon=cupon_codigo).exists():
                return Response({'mensaje': 'Cupon no valido'}, status=status.HTTP_400_BAD_REQUEST)
            else: descuento = Cupon.objects.get(cupon=cupon_codigo).descuento
        
            cupon_objeto = Cupon.objects.get(cupon=cupon_codigo)
            if cupon_objeto.vencimiento < date.today():
                return Response({'mensaje': 'El cupon esta vencido.'})
            if CuponUtilizado.objects.filter(usuario=User.objects.get(pk=self.request.user.id), cupon=cupon_objeto).exists():
                return Response({'mensaje': 'Ya ha utilizado este cupon'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_id = self.request.user.id
        user = User.objects.get(pk=user_id)
        pedido = {"fecha": date.today(), "usuario": user.id}
        pedido_serializer = PedidoSerializer(data=pedido)

        if pedido_serializer.is_valid():
            pedido = pedido_serializer.save()
        else:
            return Response(pedido_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            precioTotal = 0;
            for producto_data in productos:
                buscar_producto = Producto.objects.get(pk=producto_data.get('producto'))

                producto_data['pedido'] = pedido.id
                producto_data['precio'] = buscar_producto.precio
                serializer = ProductoPedidoSerializer(data=producto_data)
                descuento_producto = buscar_producto.descuento
                if descuento_producto > 0:
                    precio_producto = buscar_producto.precio - (buscar_producto.precio*descuento_producto/100)
                    precioTotal += precio_producto * producto_data.get('cantidad')
                else: 
                    precioTotal += buscar_producto.precio * producto_data.get('cantidad')

                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            #descuento = self.request.data.get('descuento')
            #descuento = Cupon.objects.get(cupon=cupon_codigo).descuento
            envio = 15900
            precioDescuento = precioTotal*descuento/100 
            precioTotal = (precioTotal - precioDescuento) + envio
            pedido.precio_total = precioTotal
            pedido.save()
            if cupon_objeto:
                CuponUtilizado.objects.create(usuario=request.user, cupon=cupon_objeto, pedido=pedido)
        except buscar_producto.DoesNotExist:
            pedido.delete()
            return Response({'mensaje': 'Productos invalidos'}, status=status.HTTP_400_BAD_REQUEST)
        
            

        return Response({'datos':{
                    'mensaje': 'Realizando pedido',
                    'id_pedido': pedido.id,
                    'total_a_pagar': precioTotal
                }}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='mis-pedidos')
    def misPedidos(self, request):
        user_id = self.request.user.id
        
        # pedidos = Pedido.objects.filter(usuario=user_id)
        pedidos = Pedido.objects.all()

        serializer = PedidoSerializer(pedidos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PedidoViewSet(ModelViewSet):
    model = Pedido
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()

class HistorialViewSet(ModelViewSet):
    model = Historial
    serializer_class = HistorialSerializer
    queryset = Historial.objects.all()

class WompiWebhookView(viewsets.ViewSet):
    @action(detail=False, methods=['post'], url_path='estado')
    def wompi(self, request):
        # Verificar la autenticidad del evento (puedes comparar con tu clave secreta de Wompi)
        # Aquí deberías tener la lógica para verificar la autenticidad del evento utilizando la clave secreta de Wompi.
        # La implementación exacta depende de cómo Wompi maneje la autenticación de webhook.

        event_data = request.data
        if event_data.get('data', {}).get('transaction', {}).get('status') == 'APPROVED':
            id_pedido = event_data.get('data',{}).get('transaction', {}).get('reference')
            try:
                pedido = Pedido.objects.get(id=id_pedido)
                pedido.estado = 'Aprobado'
                pedido.save()
            except Pedido.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            if event_data.get('data', {}).get('transaction', {}).get('status') == 'DECLINED':
                id_pedido = event_data.get('data',{}).get('transaction', {}).get('reference')
            try:
                pedido = Pedido.objects.get(id=id_pedido)
                pedido.estado = 'Cancelado'
                pedido.save()
                cupones_utilizados_a_eliminar = CuponUtilizado.objects.filter(pedido=pedido.id)
                cupones_utilizados_a_eliminar.delete()
            except Pedido.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({'mensaje': 'Estado Actualizado'}, status=status.HTTP_200_OK)   

