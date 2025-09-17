from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model, authenticate
from django.views.decorators.csrf import csrf_exempt

User = get_user_model()

@csrf_exempt
@api_view(['POST'])
def register(request):
    data = request.data
    email = data.get('email')
    full_name = data.get('name') 
    phone = data.get('phone')
    address = data.get('address')
    password = data.get('password')

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        email=email,
        password=password,
        full_name=full_name,
        is_staff=False
    )

    if hasattr(user, 'phone'):
        user.phone = phone
    if hasattr(user, 'address'):
        user.address = address
    user.save()

    return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['POST'])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(username=email, password=password)
    if user is not None:
        return Response({
            "token": "fake-jwt-token",
            "user": {
                "name": getattr(user, "full_name", ""),
                "email": user.email,
            }
        })
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        "name": getattr(user, "full_name", ""),
        "email": user.email,
        "address": getattr(user, "address", ""),
        "phone": getattr(user, "phone", "")
    })
