from django.db import models

# Create your models here.
class Name(models.Model):
    name = models.CharField(max_length=30)
    is_taken = models.BooleanField(default=False)

    def __str__(self):
        return self.name
