# orders/urls.py
from django.urls import path
from . import views   # ✅ இவ்வரியே முக்கியம்

urlpatterns = [
    path("register/", views.register_user, name="register"),
]
