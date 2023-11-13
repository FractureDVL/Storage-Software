from django.contrib import admin
from apps.core.models.nosotros import Nosotros

class NosotrosInline(admin.TabularInline):
    model = Nosotros
    extra = 1

class NosotrosAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'descripcion', 'image',)

    
    def has_add_permission(self, request, obj=None):
        num_registros = Nosotros.objects.count()
        return num_registros < 3

admin.site.register(Nosotros, NosotrosAdmin)