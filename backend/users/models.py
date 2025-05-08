from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLES = (
        ('administrator', 'Administrator'),
        ('guest', 'Guest'),
    )

    email = models.EmailField(unique=True)
    rol = models.CharField(max_length=13, choices=ROLES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []