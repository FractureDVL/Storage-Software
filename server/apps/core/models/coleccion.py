from django.db import models


class Coleccion(models.Model):
    coleccion = models.CharField(verbose_name=('Coleccion'), max_length=255, unique=True)
    class Meta: 
        verbose_name = 'Coleccion'
        verbose_name_plural = 'Colecciones'
    
    def __str__(self) -> str:
        return self.coleccion