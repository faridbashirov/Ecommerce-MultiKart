from rest_framework.generics import ListAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from orders.models import Wishlist,WishListItems,OrderBasket,OrderItem
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
import django_filters.rest_framework
import django_filters
from orders.api.serializer import WishlistSerializer,WishlistItemSerializer,WishlistItemGetSerializer,OrderBasketSerializer,OrderItemUpdateSerializer
class WishlistCreateView(ListCreateAPIView):
      queryset=Wishlist.objects.all()
      serializer_class = WishlistSerializer
      filter_backends=[django_filters.rest_framework.DjangoFilterBackend]
      filterset_fields=["user"]
class WishlistItemCreateView(ListCreateAPIView):
      queryset=WishListItems.objects.all()
      permission_classes = [IsAuthenticated] 
      serializer_class = WishlistItemSerializer
      
class WishlistItemGetView(ListAPIView):
      queryset=WishListItems.objects.all()
      serializer_class = WishlistItemGetSerializer
class OrderBasketView(RetrieveUpdateDestroyAPIView):
      queryset=OrderBasket.objects.all()
      
      serializer_class=OrderBasketSerializer
class OrderBasketGetView(ListAPIView):
      queryset=OrderBasket.objects.all()
      filter_backends=[django_filters.rest_framework.DjangoFilterBackend]
      filterset_fields=["user","complete"]
      serializer_class=OrderBasketSerializer
class OrderItemUpdateView(RetrieveUpdateDestroyAPIView):
      queryset=OrderItem.objects.all()
      filter_backends=[django_filters.rest_framework.DjangoFilterBackend]
      filterset_fields=["product",]
      serializer_class=OrderItemUpdateSerializer
class WishlistUpdateView(RetrieveUpdateDestroyAPIView):
      queryset=WishListItems.objects.all()
      
      serializer_class=WishlistItemSerializer
      