from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from apps.core.models.categoria import Categoria
from apps.core.models.coleccion import Coleccion

class Producto(models.Model):
    nombre = models.CharField(verbose_name=('Nombre'), max_length=100)
    descripcion = models.CharField(verbose_name=('Descripción'), max_length=250, blank=True, null=True)
    precio = models.IntegerField(verbose_name=('Precio'), validators=[MinValueValidator(0, message='El precio no puede ser negativo')])
    categoria = models.ForeignKey(Categoria, verbose_name=('Categoria'), null=False, on_delete=models.DO_NOTHING)
    estado = models.BooleanField(verbose_name=('Activo'), default=True)
    image = models.ImageField(verbose_name=('Imagen'),upload_to='productos/',  max_length=100, blank=True, null=True)
    coleccion = models.ForeignKey(Coleccion, verbose_name=('Coleccion'), blank=True, null=True, on_delete=models.DO_NOTHING)
    descuento = models.IntegerField(verbose_name=('Descuento'), default=0 ,validators=[MinValueValidator(0, message='El descuento no puede ser negativo')]) 

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self) -> str:
        return f'{self.nombre}'