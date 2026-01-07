# orders/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
def register_user(request):
    """User signup endpoint"""
    data = request.data
    
    # Simple validation (later Neon DB save pannalam)
    if not all([data.get("name"), data.get("email"), data.get("phone"), data.get("password")]):
        return Response({"error": "All fields required"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Dummy success response (later real user create pannalam)
    return Response({
        "message": "User registered successfully!",
        "user": {
            "name": data.get("name"),
            "email": data.get("email")
        }
    }, status=status.HTTP_201_CREATED)
