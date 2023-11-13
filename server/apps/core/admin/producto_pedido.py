from django.contrib import admin
from apps.core.models.historial import ProductoPedido, Pedido

#Inline
class ProductoPedidoInline(admin.StackedInline):
    model = ProductoPedido
    extra = 0

# #Admin

# #Register
# admin.site.register(ProductoPedido)

# class PedidoInline(admin.TabularInline):
#     model = Pedido
#     extra = 1

class PedidoAdmin(admin.ModelAdmin):
    inlines = [ProductoPedidoInline]
    list_display = ['id', 'fecha', 'precio_total', 'estado', 'numero_guia']

admin.site.register(Pedido, PedidoAdmin)