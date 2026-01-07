from django.urls import path
from .views import send_email_otp, verify_email_otp

app_name = "users"

urlpatterns = [
    path("send-email-otp/", send_email_otp, name="send_email_otp"),
    path("verify-email-otp/", verify_email_otp, name="verify_email_otp"),
]
