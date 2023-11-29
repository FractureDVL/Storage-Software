from django.urls import path, include, re_path
from rest_framework import routers
from apps.core.views.categoria import CategoriaViewSet
from apps.core.views.producto import ProductoViewSet
from apps.core.views.coleccion import ColeccionProductoViewSet
from apps.core.views.cupon import CuponViewSet
from apps.core.views.producto_pedido import ProductoPedidoViewSet,WompiWebhookView
from apps.core.views.colecciones import ColeccionViewSet
from apps.core.views.nosotros import NosotrosViewSet
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from apps.core.views.reporte import ReporteView

#Swagger config 
schema_view = get_schema_view(
    openapi.Info(
        title="EasyStorage app",
        default_version='v1.1',
        terms_of_service="not yet",
        contact=openapi.Contact(email="easystorage@yopmail.com")
    ),
    public=True,
    permission_classes=(permissions.AllowAny),
)

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

#Importes necesarios 
urlpatterns = [
    path('auth/', include('apps.authentication.urls')),
    path('user/', include('apps.user.urls')),
    path('', include(router.urls)),
    re_path(r'^docs/swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^docs/swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^docs/redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('mostrar_grafico/<int:categoria_id>/', CategoriaViewSet.mostrar_grafico, name='mostrar_grafico'),
    path('generar_reporte/', ReporteView.as_view(), name='generar_pdf'),
]
