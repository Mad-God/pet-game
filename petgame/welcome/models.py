from django.db import models

# Create your models here.
maze = "0"*100
maze = (maze+"\n")*100


class Lobby(models.Model):
    players = models.IntegerField(default=0)
    maze = models.TextField(default=maze)
Name = None