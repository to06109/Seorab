# Generated by Django 4.1.3 on 2022-11-28 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='platform_type',
            field=models.CharField(choices=[('google', 'google'), ('general', 'general')], default='general', max_length=255),
        ),
    ]