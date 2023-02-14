from django.urls import path
from accounts.api.views import RegisterApiView,MyObtainTokenPairView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
     path('register/', RegisterApiView.as_view(), name='auth_register'),
     path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
