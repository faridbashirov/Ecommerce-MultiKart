from contextlib import nullcontext
import uuid
from django.db import models
from core.models import AbstractModel
from datetime import datetime,timedelta
import pytz
from django.contrib.auth import get_user_model

User=get_user_model()



class ProductImg(AbstractModel):
    image=models.ImageField(upload_to="media/product_img")
    product=models.ForeignKey('product', related_name="img", on_delete=models.SET_NULL,  null=True, blank=True)
class Category(AbstractModel):
    name=models.CharField(max_length=50)
    slug=models.SlugField(max_length=300)
    parent_id=models.ForeignKey('self',on_delete=models.CASCADE, null=True,blank=True)
    def __str__(self):
        return f'{self.name} {self.parent_id}'
class Vendor(AbstractModel):
    name=models.CharField(max_length=50)
    slug=models.SlugField(max_length=300)
    star=models.IntegerField(null=True, blank=True)
    vendor_desc=models.TextField()
    vendor_img=models.ImageField(upload_to="media/vendor_img")
    vendor_banner=models.ImageField(upload_to="media/vendor_img")
    # slug=models.SlugField(max_length=300)
    def __str__(self):
        return self.name
class Product(AbstractModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title=models.CharField(max_length=250)
    slug=models.SlugField(max_length=300)
    desc=models.TextField()
    video=models.TextField()
    main_img=models.ImageField(upload_to="media/product_img")
    category=models.ForeignKey('Category',on_delete=models.CASCADE)
    price=models.FloatField()
    vendor=models.ForeignKey('Vendor', on_delete=models.CASCADE)
    discount_type=models.CharField(max_length=50, null=True, blank=True, choices=(('FAIZ' ,'Faiz'), ('QIYMET' , 'Qiymet')))
    discount_precent=models.IntegerField(null=True, blank=True)
    discount_amount=models.IntegerField(null=True, blank=True)
    name=models.CharField(max_length=50,null=True, blank=True)
    def __str__(self):
        
        return self.title
    
    @property
    def get_absolute_url(self):
      if not self.category.parent_id:
            return f"{self.category.slug}/{self.slug}"
      elif not self.category.parent_id.parent_id:
            
            return f"{self.category.parent_id.slug}/{self.category.slug}/{self.slug}"
      elif not self.category.parent_id.parent_id.parent_id:
            print(f"{self.category.parent_id.parent_id.slug}/{self.category.parent_id.slug}/{self.category.slug}/{self.slug}")
            return f"{self.category.parent_id.parent_id.slug}/{self.category.parent_id.slug}/{self.category.slug}/{self.slug}"
        
    @property
    def get_discount(self):
      if self.discount_type == 'FAIZ':
         total =(self.price- (self.price * self.discount_precent)//100)
         return total
      elif self.discount_type== "QIYMET":
         total =(self.price-  self.discount_amount)
         return total  
    @property
    def star(self):
      star=self.productstar.all()
      if len(star) >0:
       total=round(sum([stars.star for stars in star])/len(star))
      else:
          total=1
      return total
    @property
    def newproduct(self):
        if (self.created_at + timedelta(10)) > datetime.today().replace(tzinfo=pytz.utc):
            return True
        else:
            return False
    
        
class Review(AbstractModel):
    name=models.CharField(max_length=250)
    email=models.EmailField(max_length=250)
    star=models.IntegerField( default=1,null=True, blank=True)
    comment=models.TextField()
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    product=models.ForeignKey('Product',on_delete=models.CASCADE,related_name="productstar")
    def __str__(self):
        return f'{self.user, self.product}'
    

class Property( AbstractModel):
    title=models.CharField(max_length=255)
    def __str__(self):
        return self.title
class PropertyValues(AbstractModel):
    title=models.CharField(max_length=250)
    name=models.CharField(max_length=50,null=True,blank=True)
    products=models.ManyToManyField(Product,related_name="value")
    property_id=models.ForeignKey(Property,related_name="property",on_delete=models.CASCADE, null=True, blank=True)
    amount_instock=models.IntegerField()
    def __str__(self):
        return f'{str(self.property_id), self.title,self.products.all()}'
class ProductSizeColor(models.Model):
    propertyy = models.ForeignKey(PropertyValues, on_delete=models.CASCADE,null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True, blank=True)
    instock = models.IntegerField(default=1)   












