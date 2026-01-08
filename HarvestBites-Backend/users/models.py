# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
import re


def _format_to_india(number: str) -> str:
    """Normalize phone to +91 format using last 10 digits.

    If `number` is empty or shorter than 10 digits after stripping non-digits,
    the original value is returned unchanged.
    """
    if not number:
        return number
    digits = re.sub(r"\D", "", number)
    if len(digits) < 10:
        return number
    last10 = digits[-10:]
    return f"+91{last10}"


class CustomUser(AbstractUser):
    # email override with unique=True (fix auth.E003)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "name", "phone"]

    def save(self, *args, **kwargs):
        if self.phone:
            self.phone = _format_to_india(self.phone)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
