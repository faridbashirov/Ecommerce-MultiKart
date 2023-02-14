from django.contrib import admin
from .models import OrderBasket,OrderItem,Wishlist,WishListItems
admin.site.register([OrderBasket,OrderItem,Wishlist,WishListItems])
