from django.urls import path
from .views import *

urlpatterns = [
    path("checkout/",checkout,name="checkout"),
    path("order_success/",order_success,name='order_success'),
    path("wishlist/",wishlist,name="wishlist"),
    path('cart/',cart,name='cart'),
]
