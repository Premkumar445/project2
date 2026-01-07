from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order
from decimal import Decimal
import uuid

@api_view(['POST'])
def create_order(request):
    data = request.data
    print("📥 WEBSITE ORDER DATA:", data)
    
    try:
        order = Order.objects.create(
            order_number=data.get('order_number', f"HB{uuid.uuid4().hex[:6].upper()}"),
            total_amount=Decimal(str(data.get('total_amount'))),
            items_count=int(data.get('items_count', 0)),
            payment_method=data.get('payment_method', 'COD'),
            customer_name=data.get('customer_name'),
            customer_email=data.get('customer_email'),
            transaction_id=data.get('transaction_id'),
            customer_phone=data.get('customer_phone', ''),
            customer_address=data.get('customer_address', ''),
            customer_pincode=data.get('customer_pincode'),
            status='pending'
        )
        print("✅ WEBSITE ORDER SAVED:", order.order_number)
        return Response({'success': True, 'order_number': order.order_number})
    except Exception as e:
        print("❌ API ERROR:", e)
        return Response({'error': str(e)}, status=400)
