from django.db import models

# Create your models here.



class Lobby(models.Model):
    name = models.CharField(max_length=30, blank=True, null=True)
    number = models.AutoField(primary_key=True)

class Name(models.Model):
    name = models.CharField(max_length=30)
    lobby = models.ForeignKey(Lobby, on_delete=models.CASCADE, related_name="names", null=True, blank=True)

    def __str__(self):
        return self.name
    