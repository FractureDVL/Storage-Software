from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User
from apps.core.models.historial import Pedido

class Cupon(models.Model):
    cupon = models.CharField(verbose_name=('Cupon'), max_length=255, unique=True)
    descuento = models.IntegerField(verbose_name=('Descuento'), validators=[MinValueValidator(0, message='El descuento no puede ser negativo')])
    vencimiento = models.DateField(verbose_name=('Vencimiento'))
    
    class Meta: 
        verbose_name = 'Cupon'
        verbose_name_plural = 'Cupones'
    
    def __str__(self) -> str:
        return self.cupon

class CuponUtilizado(models.Model):
    usuario = models.ForeignKey(User, verbose_name=("Usuario"), on_delete=models.CASCADE)
    cupon = models.ForeignKey(Cupon, verbose_name=("Cupon"), on_delete=models.CASCADE)
    pedido = models.ForeignKey(Pedido, verbose_name=("Pedido"), on_delete=models.CASCADE)

    class Meta:
        unique_together = ('usuario', 'cupon', 'pedido')