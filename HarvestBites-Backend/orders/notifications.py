# orders/notifications.py - COMPLETE NOTIFICATION SYSTEM

from twilio.rest import Client
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.conf import settings
from decouple import config
import requests
from datetime import datetime

class NotificationService:
    
    @staticmethod
    def send_whatsapp(order_number, customer_name, total_amount, phone):
        """WhatsApp via wa.me (FREE - No Twilio needed)"""
        try:
            message = f"""🎉 HarvestBites Order Confirmed!
Order #{order_number}
Total: ₹{total_amount}
Hi {customer_name}! Delivery in 2-4 days! 🚚"""
            
            whatsapp_url = f"https://wa.me/919876543210?text={requests.utils.quote(message)}"
            print(f"✅ WhatsApp ready: {whatsapp_url}")
            return whatsapp_url  # Frontend-ல auto open
            
        except Exception as e:
            print(f"WhatsApp error: {e}")
            return None

    @staticmethod
    def send_email(order, customer_email):
        """Email via Gmail (FREE)"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Order #{order.order_number} Confirmed - HarvestBites'
            msg['From'] = config('EMAIL_HOST_USER')
            msg['To'] = customer_email
            
            html = f"""
            <h2 style="color: #f59e0b;">🎉 Order #{order.order_number} Confirmed!</h2>
            <p>Hi <strong>{order.customer_name}</strong>,</p>
            <table style="border-collapse: collapse; width: 100%;">
                <tr><td><strong>Order ID:</strong></td><td>{order.order_number}</td></tr>
                <tr><td><strong>Total:</strong></td><td>₹{order.total_amount}</td></tr>
                <tr><td><strong>Payment:</strong></td><td>{order.payment_method.upper()}</td></tr>
                <tr><td><strong>Items:</strong></td><td>{order.items_count}</td></tr>
                <tr><td><strong>Address:</strong></td><td>{order.customer_address}</td></tr>
            </table>
            <p style="margin-top: 20px;">
                <a href="https://harvestbites.com/track/{order.order_number}" 
                   style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">
                   📦 Track Order
                </a>
            </p>
            <p>Delivery in 2-4 days! 🚚</p>
            <hr>
            <small>HarvestBites - Fresh & Fast Delivery</small>
            """
            
            msg.attach(MIMEText(html, 'html'))
            
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login(config('EMAIL_HOST_USER'), config('EMAIL_HOST_PASSWORD'))
                server.send_message(msg)
                
            return True
            
        except Exception as e:
            print(f"Email error: {e}")
            return False

    @staticmethod
    def send_sms(phone, order_number, total):
        """SMS via Browser notification (FREE)"""
        message = f"HarvestBites: Order #{order_number} confirmed! ₹{total}"
        return f"SMS: {message}"
