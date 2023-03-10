# Generated by Django 3.2.2 on 2022-11-12 11:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50)),
                ('parent_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=250)),
                ('desc', models.TextField()),
                ('video', models.TextField()),
                ('main_img', models.ImageField(upload_to='static/media/product_img')),
                ('price', models.FloatField()),
                ('discount_type', models.CharField(blank=True, choices=[('FAIZ', 'Faiz'), ('QIYMET', 'Qiymet')], max_length=50, null=True)),
                ('discount_precent', models.IntegerField(blank=True, null=True)),
                ('discount_amount', models.IntegerField(blank=True, null=True)),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50)),
                ('star', models.IntegerField(blank=True, null=True)),
                ('vendor_desc', models.TextField()),
                ('vendor_img', models.ImageField(upload_to='static/media/vendor_img')),
                ('vendor_banner', models.ImageField(upload_to='static/media/vendor_img')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('star', models.IntegerField(blank=True, null=True)),
                ('comment', models.TextField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PropertyValues',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=250)),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('products', models.ManyToManyField(related_name='value', to='products.Product')),
                ('property_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='property', to='products.property')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ProductImg',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('image', models.ImageField(upload_to='static/media/product_img')),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='img', to='products.product')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='product',
            name='vendor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.vendor'),
        ),
    ]
