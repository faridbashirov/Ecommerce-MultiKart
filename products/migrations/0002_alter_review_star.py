# Generated by Django 3.2.2 on 2022-12-06 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='star',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
    ]
