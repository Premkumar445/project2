# HarvestBites-Backend/users/views.py
import json
import random

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

# Simple in‑memory OTP store (server restart ஆனா clear ஆகும்)
OTP_STORE = {}


@csrf_exempt
@require_http_methods(["POST"])
def send_email_otp(request):
    try:
        body = json.loads(request.body)
        email = body.get("email", "").strip()

        if not email:
            return JsonResponse({"error": "Email is required"}, status=400)

        # 6-digit OTP
        otp = str(random.randint(100000, 999999))

        # OTP save panna (later Redis use pannalaam)
        OTP_STORE[email] = otp

        send_mail(
            subject="HarvestBites - Email Verification OTP",
            message=f"Your OTP is: {otp}\nIt is valid for 10 minutes.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )

        return JsonResponse({"message": "OTP sent successfully"}, status=200)

    except Exception as e:
        return JsonResponse(
            {"error": f"Failed to send OTP: {e}"},
            status=500,
        )


@csrf_exempt
@require_http_methods(["POST"])
def verify_email_otp(request):
    """
    React RegisterDetails pageல OTP enter பண்ணும்போது இங்கே call பண்ணணும்.
    சரியான OTP இருந்தா success, இல்லையென்றால் error. [web:27]
    """
    try:
        body = json.loads(request.body)
        email = body.get("email", "").strip()
        otp = body.get("otp", "").strip()

        if not email or not otp:
            return JsonResponse({"error": "Email and OTP are required"}, status=400)

        correct_otp = OTP_STORE.get(email)

        if correct_otp is None:
            return JsonResponse(
                {"error": "OTP not found. Please request again."},
                status=400,
            )

        if otp != correct_otp:
            return JsonResponse({"error": "Invalid OTP"}, status=400)

        # success
        return JsonResponse({"message": "OTP verified successfully"}, status=200)

    except Exception as e:
        return JsonResponse(
            {"error": f"Failed to verify OTP: {e}"},
            status=500,
        )
