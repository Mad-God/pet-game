# Generated by Django 4.1.5 on 2023-02-17 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Lobby",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=30, null=True)),
                ("players", models.IntegerField(default=0)),
                ("maze", models.TextField()),
            ],
        ),
    ]
