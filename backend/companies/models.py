from django.db import models

class Companie(models.Model):
    nit = models.CharField(primary_key=True, max_length=20)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name