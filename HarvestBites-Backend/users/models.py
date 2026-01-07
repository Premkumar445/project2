# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    # email override with unique=True (fix auth.E003)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "name", "phone"]

    def __str__(self):
        return self.email
