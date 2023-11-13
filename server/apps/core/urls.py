from django.urls import path, include
from rest_framework import routers
from apps.core.views.categoria import CategoriaViewSet
from apps.core.views.producto import ProductoViewSet
from apps.core.views.coleccion import ColeccionProductoViewSet
from apps.core.views.cupon import CuponViewSet
from apps.core.views.producto_pedido import ProductoPedidoViewSet,WompiWebhookView
from apps.core.views.colecciones import ColeccionViewSet
from apps.core.views.nosotros import NosotrosViewSet

app_name = 'core'
router = routers.DefaultRouter()
##Configurar rutas 
router.register(prefix='product', viewset=ProductoViewSet, basename='product')
router.register(prefix='collection', viewset=ColeccionProductoViewSet, basename='collection')
router.register(prefix='cupon', viewset=CuponViewSet, basename='cupon')
router.register(prefix='pedido', viewset=ProductoPedidoViewSet, basename='pedido')
router.register(prefix='colecciones', viewset=ColeccionViewSet, basename='coleccion')
router.register(prefix='nosotros', viewset=NosotrosViewSet, basename='nosotros')
router.register(prefix='wompi', viewset=WompiWebhookView, basename='wompi')
router.register(prefix='categoria', viewset=CategoriaViewSet, basename='categoria')

#
#

urlpatterns = [
    path('auth/', include('apps.authentication.urls')),
    path('user/', include('apps.user.urls')),
    path('', include(router.urls))   
]
