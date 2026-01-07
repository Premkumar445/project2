// src/services/notificationService.ts
import axios from 'axios';

// 1. WHATSAPP (WhatsApp Business API / MSG91)
export const sendWhatsAppNotification = async (order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paymentMethod: string;
}) => {
  const message = `🎉 *Order Confirmed!* ${order.customerName}

📋 Order #: ${order.orderNumber}
💰 Total: ₹${order.totalAmount}
💳 Payment: ${order.paymentMethod}

📦 Expected delivery: 2-4 days
🔗 Track: https://harvestbites.com/track/${order.orderNumber}

Thank you for shopping! 🍪`;

  try {
    await axios.post('/api/whatsapp/send', {
      to: `91${order.customerPhone}`,
      message,
    });
    console.log('✅ WhatsApp sent');
  } catch (error) {
    console.error('❌ WhatsApp failed:', error);
  }
};

// 2. EMAIL (Resend / SendGrid)
export const sendEmailNotification = async (order: {
  to: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
  transactionId: string;
}) => {
  try {
    await axios.post('/api/email/order-confirmation', {
      to: order.to,
      subject: `Order #${order.orderNumber} Confirmed - HarvestBites`,
      html: `
        <h1>Order Confirmed! 🎉</h1>
        <p>Hi ${order.customerName},</p>
        <p>Your order <strong>#${order.orderNumber}</strong> has been placed successfully!</p>
        <p><strong>Total: ₹${order.totalAmount}</strong></p>
        <p>Transaction ID: ${order.transactionId}</p>
        <a href="https://harvestbites.com/track/${order.orderNumber}" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Track Order</a>
      `,
    });
    console.log('✅ Email sent');
  } catch (error) {
    console.error('❌ Email failed:', error);
  }
};

// 3. SMS (MSG91 / Twilio)
export const sendSMSNotification = async (order: {
  to: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
}) => {
  const message = `HarvestBites: Order #${order.orderNumber} confirmed! Total: Rs.${order.totalAmount}. Track at harvestbites.com/track/${order.orderNumber}`;
  
  try {
    await axios.post('/api/sms/send', {
      to: order.to,
      message,
    });
    console.log('✅ SMS sent');
  } catch (error) {
    console.error('❌ SMS failed:', error);
  }
};
