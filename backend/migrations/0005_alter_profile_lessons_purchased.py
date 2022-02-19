# Generated by Django 4.0 on 2022-02-13 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_lesson_access_profile_lessons_purchased'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='lessons_purchased',
            field=models.ManyToManyField(blank=True, related_name='profiles', to='backend.Lesson'),
        ),
    ]
