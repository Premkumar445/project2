# your_app/serializers.py
from rest_framework import serializers
from decimal import Decimal
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    discount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['id', 'order_number', 'order_date', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        # ✅ Auto-calculate items_count
        items_count = len(validated_data.get('items', []))
        validated_data['items_count'] = items_count
        return super().create(validated_data)
