# Generated by Django 3.2.2 on 2023-01-16 09:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ShippingAdress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flat', models.CharField(blank=True, max_length=100, null=True)),
                ('Zip_Code', models.IntegerField()),
                ('City', models.CharField(max_length=200)),
                ('Address', models.CharField(max_length=200)),
                ('Country', models.CharField(max_length=200)),
                ('Region_State', models.CharField(max_length=200)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_shipments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
