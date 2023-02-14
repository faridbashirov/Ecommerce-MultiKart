from django.urls import path
from orders.api.views import WishlistItemCreateView,WishlistCreateView,WishlistItemGetView,OrderBasketView,OrderBasketGetView,OrderItemUpdateView,WishlistUpdateView

urlpatterns = [
    path("wishlist/",WishlistCreateView.as_view(),name="wishlist"),
    path("wishlistitems/",WishlistItemCreateView.as_view(),name="wishlistitems"),
    path("wishlistitemsget/",WishlistItemGetView.as_view(),name="wishlistitems"),
    path("orderbasket/<int:pk>",OrderBasketView.as_view(),name="basket"),
    path("orderbasket/",OrderBasketGetView.as_view(),name="basket1"),
    path("orderitems/<int:pk>",OrderItemUpdateView.as_view(),name="orderitem"),
    path("wishlistitems/<int:pk>",WishlistUpdateView.as_view(),name="orderitemupdate"),
     ]
