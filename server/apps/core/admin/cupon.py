from django.contrib import admin
from apps.core.models.cupon import Cupon

class CuponAdmin(admin.ModelAdmin):
    list_display = ('cupon', 'descuento', 'vencimiento')

admin.site.register(Cupon, CuponAdmin)