from django.shortcuts import render

def payment_page(request):
    """
    Simple demo payment page without Razorpay API.
    URL: /api/payments/page/?order_id=HB4281&amount=25900
    """
    # frontend la paise send pannrom (25900) → rupess ku convert
    amount_paise = int(request.GET.get("amount", "0") or 0)
    amount_rupees = amount_paise / 100
    order_id = request.GET.get("order_id", "")

    context = {
        "amount": amount_rupees,
        "order_id": order_id,
    }
    return render(request, "payment.html", context)
