from django.db import models
from apps.core.models.producto import Producto
from apps.core.models.coleccion import Coleccion


#colecciones asociados a un producto
class ColeccionProducto(models.Model):
    producto = models.ForeignKey(Producto, verbose_name=('Producto'), on_delete=models.DO_NOTHING)
    coleccion = models.ForeignKey(Coleccion,verbose_name=('Coleccion'), on_delete=models.DO_NOTHING)
    
    class Meta: 
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'
        unique_together = ('producto', 'coleccion') 

    def __str__(self) -> str:
        return f'{self.coleccion.coleccion} + {self.producto.nombre}'

    
    