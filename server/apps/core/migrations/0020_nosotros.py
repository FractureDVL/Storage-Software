# Generated by Django 4.0.5 on 2023-11-04 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_remove_pedido_precio_total_pedido_precio_total'),
    ]

    operations = [
        migrations.CreateModel(
            name='Nosotros',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.CharField(max_length=250, verbose_name='Descripción')),
                ('image', models.ImageField(blank=True, null=True, upload_to='productos/', verbose_name='Imagen')),
            ],
            options={
                'verbose_name': 'Nosotros',
                'verbose_name_plural': 'Nosotros',
            },
        ),
    ]
