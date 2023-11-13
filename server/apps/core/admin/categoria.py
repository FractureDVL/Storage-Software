from django.contrib import admin
from apps.core.admin.producto import ProductoInline
from apps.core.models.categoria import Categoria

class CategoriasAdmin(admin.ModelAdmin):
    inlines = [ProductoInline]
    list_display = ['nombre', 'mostrar_productos']

    def mostrar_productos(self, obj):
        productos = obj.producto_set.all()
        return ', '.join([producto.nombre for producto in productos])

admin.site.register(Categoria, CategoriasAdmin)
