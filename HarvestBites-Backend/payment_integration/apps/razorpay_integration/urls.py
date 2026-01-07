from django.urls import path
from . import views

urlpatterns = [
    path("page/", views.payment_page, name="payment_page"),
]
