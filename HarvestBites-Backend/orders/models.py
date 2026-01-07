from django.db import models
from django.utils import timezone

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    order_number = models.CharField(max_length=50, unique=True)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    order_date = models.DateTimeField(default=timezone.now)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    items_count = models.IntegerField(default=0)
    payment_method = models.CharField(max_length=20, default='COD')
    
    # Customer details - ✅ SINGLE customer_email only
    customer_email = models.EmailField()
    customer_name = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=15, blank=True)
    customer_address = models.TextField(blank=True)
    customer_pincode = models.CharField(max_length=10)
    
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'orders'
        ordering = ['-created_at']
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
    
    def __str__(self):
        return f"{self.order_number} - ₹{self.total_amount}"
    
    def get_status_display(self):
        """Human readable status"""
        return dict(self.STATUS_CHOICES).get(self.status, self.status)
    
    @property
    def formatted_amount(self):
        """Formatted amount for display"""
        return f"₹{self.total_amount:,.2f}"
    
    @property
    def short_order_number(self):
        """Short order number for display"""
        return self.order_number[-8:] if self.order_number else f"HB{self.id}"
