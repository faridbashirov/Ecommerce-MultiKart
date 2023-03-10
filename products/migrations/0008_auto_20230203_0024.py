# Generated by Django 3.2.2 on 2023-02-02 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_auto_20230202_0212'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='slug',
            field=models.SlugField(default='slug', max_length=300),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='main_img',
            field=models.ImageField(upload_to='media/product_img'),
        ),
        migrations.AlterField(
            model_name='productimg',
            name='image',
            field=models.ImageField(upload_to='media/product_img'),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='vendor_banner',
            field=models.ImageField(upload_to='media/vendor_img'),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='vendor_img',
            field=models.ImageField(upload_to='media/vendor_img'),
        ),
    ]
