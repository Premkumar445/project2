from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer

User = get_user_model()


@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Generate token for the new user
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "token": token.key,
            },
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"detail": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(request, email=email, password=password)

    if user is None:
        return Response(
            {"detail": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    # Get or create token
    token, created = Token.objects.get_or_create(user=user)

    return Response(
        {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "token": token.key,
        },
        status=status.HTTP_200_OK,
    )
