// src/services/orderService.ts - FIXED VERSION
import axios from 'axios';

export const saveOrderToDatabase = async (orderData: any) => {
  try {
    console.log('🔥 Saving to Neon PG:', orderData.orderNumber);
    
    const response = await axios.post(
  'http://127.0.0.1:8000/api/orders/create_order/',
  {
    order_number: orderData.orderNumber,
    transaction_id: orderData.transactionId,
    order_date: new Date().toISOString(),
    total_amount: orderData.total,
    items_count: orderData.items,
    payment_method: orderData.paymentMethod,
    customer_name: orderData.customer.name,
    customer_phone: orderData.customer.phone,
    customer_address: orderData.customer.address,
    customer_pincode: orderData.customer.pincode,
    customer_email: orderData.customer.email,
    status: 'Conformed'
  },
  {
    headers: { 'Content-Type': 'application/json' }
  }
);
    console.log('✅ DATABASE + NOTIFICATIONS:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ SAVE FAILED:', error.response?.data || error.message);
    throw error;
  }
};
