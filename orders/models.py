from django.db import models
from core.models import AbstractModel
from django.contrib.auth import get_user_model
from products.models import Product
User=get_user_model()
class OrderBasket(AbstractModel):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    complete=models.BooleanField(default=False, null=True, blank=True)
    transaction_id=models.CharField(max_length=200,null=True, blank=True)
    
    def ___str__(self):
        return self.user
    
    @property
    def get_total(self):
        orderitems=self.basket.all()
        total=sum([item.get_total for item in orderitems])
        return total
class OrderItem(AbstractModel):
    product=models.ForeignKey(Product,related_name="product",on_delete=models.CASCADE)
    order=models.ForeignKey(OrderBasket,related_name="basket",on_delete=models.CASCADE)
    quantity=models.IntegerField(default=0,null=True,blank=True)
    size=models.CharField(max_length=10)
    color=models.CharField(max_length=15)
    @property
    def get_total(self):
        
        total=self.product.price * self.quantity
        return total
    
class Wishlist(AbstractModel):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name="wishlistuser"  )
    def ___str__(self):
        return self.user
    
class WishListItems(AbstractModel):
      product=models.ForeignKey(Product,related_name="wishproduct",on_delete=models.CASCADE)
      wishproduct=models.ForeignKey(Wishlist,related_name="wishlist",on_delete=models.CASCADE)
      