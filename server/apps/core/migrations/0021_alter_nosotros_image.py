# Generated by Django 4.0.5 on 2023-11-04 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0020_nosotros'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nosotros',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='nosotros/', verbose_name='Imagen'),
        ),
    ]