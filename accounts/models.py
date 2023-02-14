from django.db import models
from django.contrib.auth import get_user_model
User=get_user_model()
class ShippingAdress(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="user_shipments")
    flat=models.CharField(max_length=100,null=True,blank=True)
    zip_code=models.IntegerField()
    city=models.CharField(max_length=200)
    address=models.CharField(max_length=200)
    country =models.CharField(max_length=200)
    region_state=models.CharField(max_length=200)