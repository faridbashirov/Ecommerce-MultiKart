# Generated by Django 3.2.2 on 2023-02-07 12:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0013_vendor_slug'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductSizeColor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('instock', models.IntegerField(default=1)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product')),
                ('propertyy', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='products.propertyvalues')),
            ],
        ),
    ]
