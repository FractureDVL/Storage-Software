from django.contrib.auth.models import User
from apps.core.models.producto import Producto
from django.db import models
import uuid
#Pedidos 
class Pedido(models.Model):
    class UserRanges(models.TextChoices):
        PENDIENTE = ('Pendiente')
        APROBADO = ('Aprobado')
        CANCELADO = ('Cancelado')
        DEVOLUCION = ('Devolución')

    id = models.CharField(primary_key=True, verbose_name='Id pedido', null=False, max_length=50, unique=True, default=uuid.uuid4, editable=False)
    fecha = models.DateTimeField(auto_now=True, editable=False, verbose_name='Fecha', null=False)
    usuario = models.ForeignKey(User, verbose_name='Usuario', null=False, on_delete=models.DO_NOTHING)
    estado = models.CharField(verbose_name='Estado del pedido', null=False, choices=UserRanges.choices, default='Pendiente', max_length=50)
    precio_total = models.DecimalField(verbose_name='Precio total', null=True, decimal_places=5, max_digits=25)
    empresa_envio = models.CharField(verbose_name='Empresa de envio', null=True, default='Sin asignar', max_length=50)
    numero_guia = models.CharField(verbose_name='Número de guia', null=True, default='Sin asignar', max_length=50)
    
    class Meta: 
        verbose_name = 'Pedido'
        verbose_name_plural = 'Pedidos'
    
    def save(self, *args, **kwargs):
        # Genera un nuevo UUID solo si el objeto aún no tiene un ID asignado
        if not self.id:
            self.id = str(uuid.uuid4())
        super(Pedido, self).save(*args, **kwargs)
    
    def __str__(self) -> str:
        return f'{self.id}, {self.fecha }, {self.usuario.pk}, {self.estado}, {self.precio_total}'

#Historia de pedidos de un usuario
class Historial(models.Model): 
    pedido = models.ForeignKey(Pedido, verbose_name='Pedido', null=False, on_delete=models.DO_NOTHING)
    class Meta: 
        verbose_name = 'Historial'
        verbose_name_plural = 'Historial'

#Productos / pedidos
class ProductoPedido(models.Model):
    pedido = models.ForeignKey(Pedido, verbose_name='Pedido',on_delete=models.CASCADE, null=True, blank=True)
    producto = models.ForeignKey(Producto,verbose_name='Producto', null=False, on_delete=models.DO_NOTHING, default='')
    precio = models.DecimalField(verbose_name='Precio', null=False, decimal_places=5, max_digits=25)
    cantidad = models.IntegerField(verbose_name='Cantidad', null=False)
    talla = models.IntegerField(verbose_name='Talla')

    class Meta: 
        verbose_name = 'Producto pedido'

    def __str__(self) -> str:
        return f'{self.producto }, {self.pedido}'