# Generated by Django 4.1.3 on 2022-11-29 14:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='user_id',
            new_name='user',
        ),
        migrations.AlterModelTable(
            name='category',
            table='Category',
        ),
    ]
