from rest_framework.generics import ListAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework import serializers
from products.models import Product,PropertyValues,ProductImg,Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
class PropertySerializer(serializers.ModelSerializer):
    
      class Meta:
        model=PropertyValues
        fields=(
            
        "title","name","property_id")      
class ProductImgSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductImg
        fields=("image",)
class ProductSerializer(serializers.ModelSerializer):
    value=serializers.SerializerMethodField()
    img=serializers.SerializerMethodField()
    category=CategorySerializer()
    class Meta:
        model = Product
        fields = ("id","title","desc","video","main_img","category","price","vendor","discount_type","discount_amount","discount_precent","name","star","img","value","get_discount","get_absolute_url",)
        read_only_fields = (
        'star_field',
        )
    def get_value(self,obj):
        serializer=PropertySerializer(obj.value.all(),many=True)
        return serializer.data
    def get_img(self,obj):
        serializer=ProductImgSerializer(obj.img.all(),many=True)
        return serializer.data
# class ProductSerializer()