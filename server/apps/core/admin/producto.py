from django.contrib import admin
from apps.core.models.producto import Producto

class ProductoInline(admin.TabularInline):
    model = Producto
    extra = 1

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'estado', 'categoria')

admin.site.register(Producto, ProductoAdmin)