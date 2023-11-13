from django.contrib import admin
# from apps.core.models.coleccion import Coleccion
# from apps.core.models.coleccion_producto import ColeccionProducto
from apps.core.admin.producto import ProductoInline
from apps.core.models.coleccion import Coleccion

# # INLINE
# class ColeccionProductoInline(admin.StackedInline):
#     model = ColeccionProducto

# # ADMIN
# class ColeccionAdmin(admin.ModelAdmin):
#     inlines = [ColeccionProductoInline] 

# # REGISTER
# admin.site.register(Coleccion, ColeccionAdmin)

class ColeccionesAdmin(admin.ModelAdmin):
    inlines = [ProductoInline]
    list_display = ['coleccion', 'mostrar_productos']

    def mostrar_productos(self, obj):
        productos = obj.producto_set.all()
        return ', '.join([producto.nombre for producto in productos])

admin.site.register(Coleccion, ColeccionesAdmin)