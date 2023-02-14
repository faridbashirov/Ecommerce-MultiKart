from django import template
from products.models import Category
from orders.models import *
import json
register = template.Library()

@register.simple_tag
def category():
    
  return Category.objects.all()
@register.simple_tag(takes_context = True)
def basket(context,user):
    if user.is_authenticated:
      order,created=OrderBasket.objects.get_or_create(user=user,complete=False)
      items=order.basket.all()
      return items
    else:
       request = context['request']
       try:
          cart=json.loads(request.COOKIES["cart"])
          print(cart)
       except:
            cart={}
       items=[]
       order={"get_total":0,"get_cart_items":0}
       cartItems=order["get_cart_items"]
       for i in cart:
           product=Product.objects.get(id=i) 
           total=(product.price)*cart[i]["quantity"]
           order["get_total"]+=total
           item={
               "product":{
                   "id":product.id,
                   "title":product.name,
                   "main_img":product.main_img,
                   "price":product.price,
                                   
               },
               "quantity":cart[i]["quantity"],
               "get_total":total
               
           }
           items.append(item)
           return items
    
       
@register.simple_tag(takes_context = True)
def totalbasket(context,user):
    if user.is_authenticated:
      order,created=OrderBasket.objects.get_or_create(user=user,complete=False)
    
      return order
    else:
       request = context['request']
       try:
          cart=json.loads(request.COOKIES["cart"])
          print(cart)
       except:
            cart={}
       items=[]
       order={"get_total":0,"get_cart_items":0}
       cartItems=order["get_cart_items"]
       for i in cart:
           product=Product.objects.get(id=i) 
           total=(product.price)*cart[i]["quantity"]
           order["get_total"]+=total
           item={
               "product":{
                   "id":product.id,
                   "title":product.name,
                   "main_img":product.main_img,
                   "price":product.price,
                                   
               },
               "quantity":cart[i]["quantity"],
               "get_total":total
               
           }
           items.append(item)
           return order
    