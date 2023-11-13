from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from apps.user.choices import UserRanges

class UserInformationModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,  verbose_name=_('Usuario'),  help_text=_('Seleccione Usuario'),related_name='information', null=True)
    identification = models.CharField(max_length=15, null=False, verbose_name='Documento de identidad', unique=True)
    user_type = models.CharField(max_length= 255,choices=UserRanges.choices,default=UserRanges.CLIENT,verbose_name=_('Tipo de usuario'), help_text='Seleccione un tipo de usuario',blank=False, null=False)
    address = models.CharField(max_length=255, blank='', null=True)

    def __str__(self) -> str:
        return str(self.user) 
        
    class Meta:
        verbose_name = _('Información adicional')
        verbose_name_plural = _('Informaciones adicionales')
