# Generated by Django 4.0.5 on 2023-11-05 15:17

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0026_cuponutilizado'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='descuento',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='El descuento no puede ser negativo')], verbose_name='Descuento'),
        ),
    ]
