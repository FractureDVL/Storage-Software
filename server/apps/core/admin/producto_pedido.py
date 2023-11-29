from django.contrib import admin
from apps.core.models.historial import ProductoPedido, Pedido
from django.urls import reverse
from django.utils.html import format_html 

#Inline
class ProductoPedidoInline(admin.StackedInline):
    model = ProductoPedido
    extra = 0

class PedidoAdmin(admin.ModelAdmin):
    inlines = [ ProductoPedidoInline ] 
    list_display = ['id', 'fecha', 'precio_total', 'estado', 'numero_guia']
    list_filter = ['estado']
    list_select_related = False
    actions_on_top = True 
    actions_on_bottom = False  # No mostrar acciones en la parte inferior (opcional)

    def custom_button(self, obj):
        # Lógica del botón personalizado
        url = reverse('apps:core:generar_pdf')
        return format_html('<a class="button" href="{}">Mi Botón</a>', url)

    custom_button.short_description = 'Acción Personalizada'

    def get_actions(self, request):
        actions = super().get_actions(request)
        actions['custom_action'] = (self.custom_button, 'custom_action', 'Acción Personalizada')
        return actions
    
admin.site.register(Pedido, PedidoAdmin)