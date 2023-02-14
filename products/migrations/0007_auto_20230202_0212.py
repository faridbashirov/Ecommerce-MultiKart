# Generated by Django 3.2.2 on 2023-02-01 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_category_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='main_img',
            field=models.ImageField(upload_to='product_img'),
        ),
        migrations.AlterField(
            model_name='productimg',
            name='image',
            field=models.ImageField(upload_to='product_img'),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='vendor_banner',
            field=models.ImageField(upload_to='vendor_img'),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='vendor_img',
            field=models.ImageField(upload_to='vendor_img'),
        ),
    ]
