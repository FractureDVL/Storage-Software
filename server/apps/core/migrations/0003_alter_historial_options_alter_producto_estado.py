# Generated by Django 4.0.5 on 2023-10-28 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_rename_estado_producto_producto_estado_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='historial',
            options={'verbose_name': 'Historial', 'verbose_name_plural': 'Historial'},
        ),
        migrations.AlterField(
            model_name='producto',
            name='estado',
            field=models.BooleanField(verbose_name='Estado'),
        ),
    ]