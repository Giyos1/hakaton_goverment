# Generated by Django 4.1.5 on 2023-01-29 06:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0005_regionstatus_x_regionstatus_y'),
    ]

    operations = [
        migrations.RenameField(
            model_name='regionstatus',
            old_name='region',
            new_name='name',
        ),
    ]