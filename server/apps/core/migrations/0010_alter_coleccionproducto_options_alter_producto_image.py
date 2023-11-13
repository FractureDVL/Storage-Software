# Generated by Django 4.0.5 on 2023-10-28 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_coleccionproducto'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='coleccionproducto',
            options={'verbose_name': 'Producto', 'verbose_name_plural': 'Productos'},
        ),
        migrations.AlterField(
            model_name='producto',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='productos/', verbose_name='Imagen'),
        ),
    ]