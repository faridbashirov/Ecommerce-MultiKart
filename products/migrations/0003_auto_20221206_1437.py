# Generated by Django 3.2.2 on 2022-12-06 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_alter_review_star'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='email',
            field=models.EmailField(default=1, max_length=250),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='review',
            name='name',
            field=models.CharField(default=1, max_length=250),
            preserve_default=False,
        ),
    ]
