# Generated by Django 4.0.5 on 2023-10-28 20:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_producto_estado_alter_producto_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coleccion',
            name='coleccion',
            field=models.CharField(max_length=255, unique=True, verbose_name='Coleccion'),
        ),
    ]