from accounts.api.serializer import RegisterSerializer
from rest_framework.generics import CreateAPIView
from accounts.api.serializer import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
User=get_user_model()
class RegisterApiView(CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer