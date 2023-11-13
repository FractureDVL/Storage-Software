from django.db import models

class Nosotros(models.Model):
    titulo = models.CharField(verbose_name=('Titulo'), max_length=250, null=True)
    descripcion = models.CharField(verbose_name=('Descripción'), max_length=5000, null=True)
    image = models.ImageField(verbose_name=('Imagen'),upload_to='nosotros/',  max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = 'Nosotros'
        verbose_name_plural = 'Nosotros'

    def __str__(self) -> str:
        return f'{self.titulo, self.descripcion, self.image}'