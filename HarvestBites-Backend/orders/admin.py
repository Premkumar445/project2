# orders/admin.py - Replace completely

from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'order_number', 'customer_name', 'total_amount', 
        'payment_method', 'status', 'order_date'
    ]
    list_filter = ['status', 'payment_method', 'order_date']
    search_fields = ['order_number', 'customer_name', 'customer_email']
    readonly_fields = ['order_number', 'order_date', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'transaction_id', 'order_date', 'status')
        }),
        ('Payment Details', {
            'fields': ('payment_method', 'total_amount', 'items_count')
        }),
        ('Customer Details', {
            'fields': (
                'customer_name', 'customer_email', 'customer_phone',
                'customer_address', 'customer_pincode'
            )
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
