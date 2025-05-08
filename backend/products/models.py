import random
import string
from django.db import models
from django.contrib.postgres.fields import JSONField
from companies.models import Companie

def generate_code(name):
    initials = ''.join([word[0] for word in name.split()])[:3].upper()
    numbers = ''.join(random.choices(string.digits, k=3))
    return f"{initials}-{numbers}"

class Product(models.Model):
    code = models.CharField(max_length=255, unique=True, blank=True)
    name = models.CharField(max_length=100)
    characteristics = models.TextField(blank=True)
    prices = models.JSONField(default=dict)
    company = models.ForeignKey(Companie, on_delete=models.CASCADE, related_name='products')

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = generate_code(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
