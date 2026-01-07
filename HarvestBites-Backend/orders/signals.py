from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from .models import Order

@receiver(post_save, sender=Order)
def send_order_confirmation(sender, instance, created, **kwargs):
    if created:
        order_ref = instance.order_number
        print(f"✅ Order created: {order_ref} → {instance.customer_email}")
        print("🚀 SIGNAL TRIGGERED!")
        
        subject = f"Order #{order_ref} Confirmed - HarvestBites"
        html_message = render_to_string('orders/order_confirmation.html', {
            'order': instance,
            'order_id': order_ref,
            'customer_name': instance.customer_name,
            'customer_phone': instance.customer_phone,
            'delivery_date': (timezone.now() + timedelta(days=3)).strftime("%d %b, %Y")
        })
        
        send_mail(
            subject=subject,
            message="Order confirmed! Check your email.",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[instance.customer_email],
            html_message=html_message,
            fail_silently=False,
        )
        print(f"✅ SIGNAL EMAIL SENT: {instance.customer_email}")
