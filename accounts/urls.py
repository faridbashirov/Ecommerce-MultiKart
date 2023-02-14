from django.urls import path
from .views import *
from .views import UserPasswordResetView,UserPasswordResetConfirmView
urlpatterns = [
    path('forget_pwd/',UserPasswordResetView.as_view(),name='forget_pwd'),
    path('login/',LoginView.as_view(),name='login'),
    path('profile/',UserProfile,name='profile'),
    path('register/',RegisterView.as_view(),name='register'),
    path("logout/",LogoutView.as_view(),name='logout'),
    path("password_reset/<str:uidb64>/<str:token>/",UserPasswordResetConfirmView.as_view(),name='password-reset'),
    path("activate/<str:uidb64>/<str:token>/",ActivatAccauntView.as_view(), name="activate")
]
