from rest_framework import serializers
from orders.models import Wishlist,WishListItems,OrderBasket,OrderItem
from products.api.serializer import ProductSerializer

class OrderBasketSerializer(serializers.ModelSerializer):
    basket=serializers.SerializerMethodField()
    class Meta:
       model=OrderBasket
       fields=("user","complete","transaction_id","basket","get_total")
    def get_basket(self,obj):
        serializer=OrderItemGetSerializer(obj.basket.all(),many=True)
        return serializer.data 
       
class WishlistSerializer(serializers.ModelSerializer):
    wishlist=serializers.SerializerMethodField()
    class Meta:
       model=Wishlist
       fields=("user","wishlist","id")
    def get_wishlist(self,obj):
        serializer=WishlistItemGetSerializer(obj.wishlist.all(),many=True)
        return serializer.data
class WishlistItemSerializer(serializers.ModelSerializer):
    wishproduct=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model= WishListItems
        fields=(
            "id",
            "product",
            "wishproduct",
            

        )
    def validate(self, data):
        request=self.context["request"]
        print(request.user)
        wishlist,created=Wishlist.objects.get_or_create(user=request.user)
        data["wishproduct"]=Wishlist.objects.get(user=request.user)
        return super().validate(data)
class WishlistItemGetSerializer(serializers.ModelSerializer):
    wishproduct=serializers.PrimaryKeyRelatedField(read_only=True)
    product =ProductSerializer()
    class Meta:
        model= WishListItems
        fields=(
            "id",
            "product",
            "wishproduct",
            
            
        )
    def validate(self, data):
        request=self.context["request"]
        wishlist,created=Wishlist.objects.get_or_create(user=request.user)
        data["wishproduct"]=Wishlist.objects.get(user=request.user)
        return super().validate(data)

class OrderItemGetSerializer(serializers.ModelSerializer):
    product=ProductSerializer()
    class Meta:
      model=OrderItem
      fields=("product","order","quantity","id","size","color")
class OrderItemUpdateSerializer(serializers.ModelSerializer):
   
    class Meta:
      model=OrderItem
      fields=("product","order","quantity","id")
      