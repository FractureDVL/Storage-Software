# apps/core/admin/reporte.py
from django.urls import reverse
from django.utils.html import format_html
from django.contrib import admin
from apps.core.models.reporte import ReporteModel

class ReporteAdmin(admin.ModelAdmin):
    list_display = ['reporte_categoria', ]
                    # 'reporte_productos', 'reporte_ventas']
    styles = "color: white; border-radius:4px 16px; background-color: blue;"
    def reporte_categoria(self, obj):
        url = reverse('core:generar_pdf')  # Ajusta esta URL según tu configuración
        
        return format_html('<a style="color: white; padding:4px 16px; border-radius:4px; background-color: rgb(53,121,243);"  href="{}">Reporte General</a>', url)

admin.site.register(ReporteModel, ReporteAdmin)
