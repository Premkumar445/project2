from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from twilio.rest import Client
import os

from .models import Order


@receiver(post_save, sender=Order)
def send_order_confirmation(sender, instance, created, **kwargs):
    if created:
        order_ref = instance.order_number
        delivery_date = (timezone.now() + timedelta(days=3)).strftime("%d %b, %Y")

        print("🚀 SIGNAL TRIGGERED")

        # ---------------- EMAIL ----------------
        subject = f"Order #{order_ref} Confirmed - HarvestBites"

        html_message = render_to_string(
            'orders/order_confirmation.html',
            {
                'order': instance,
                'order_id': order_ref,
                'customer_name': instance.customer_name,
                'customer_phone': instance.customer_phone,
                'delivery_date': delivery_date
            }
        )

        send_mail(
            subject=subject,
            message="Order confirmed! Check your email.",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[instance.customer_email],
            html_message=html_message,
            fail_silently=False,
        )

        print(f"✅ EMAIL SENT → {instance.customer_email}")

        # ---------------- WHATSAPP ----------------
        try:
            client = Client(
                os.getenv("TWILIO_ACCOUNT_SID"),
                os.getenv("TWILIO_AUTH_TOKEN")
            )

            whatsapp_msg = (
                f"✅ *HarvestBites Order Confirmed*\n\n"
                f"👤 Name: {instance.customer_name}\n"
                f"🧾 Order ID: {order_ref}\n"
                f"💰 Amount: ₹{instance.total_amount}\n"
                f"📅 Delivery: {delivery_date}\n\n"
                f"Thank you for shopping with HarvestBites 🌾"
            )

            client.messages.create(
                from_=os.getenv("TWILIO_WHATSAPP_FROM"),
                to=f"whatsapp:{instance.customer_phone}",
                body=whatsapp_msg
            )

            print(f"✅ WHATSAPP SENT → {instance.customer_phone}")

        except Exception as e:
            print("❌ WHATSAPP ERROR:", e)
