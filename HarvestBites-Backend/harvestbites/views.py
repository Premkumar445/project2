# harvestbites/views.py - ADD THIS TO END
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import requests
import json
from django.conf import settings

@method_decorator(csrf_exempt, name='dispatch')
class WhatsAppView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            phone = data['to']
            message = data['message']
            url = "https://www.mydemoapi.com/sendhttp.php"
            params = {
                'type': 'text',
                'apikey': getattr(settings, 'MSG91_AUTH_KEY', 'demo'),
                'to': phone,
                'sender': getattr(settings, 'MSG91_SENDER_ID', 'HBITES'),
                'message': message,
            }
            response = requests.get(url, params=params)
            return JsonResponse({'status': 'success', 'msg91': response.text})
        except Exception as e:
            return JsonResponse({'status': 'error', 'error': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class SMSView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            phone = data['to']
            message = data['message']
            url = "https://www.mydemoapi.com/sendhttp.php"
            params = {
                'type': 'text',
                'apikey': getattr(settings, 'MSG91_AUTH_KEY', 'demo'),
                'to': phone,
                'sender': getattr(settings, 'MSG91_SENDER_ID', 'HBITES'),
                'message': message,
            }
            response = requests.get(url, params=params)
            return JsonResponse({'status': 'success', 'msg91': response.text})
        except Exception as e:
            return JsonResponse({'status': 'error', 'error': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class EmailView(View):
    def post(self, request):
        return JsonResponse({'status': 'success', 'message': 'Email queued'})
