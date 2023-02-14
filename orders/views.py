from django.shortcuts import render
from .models import *
from django.contrib.auth.decorators import login_required
from accounts.models import ShippingAdress
import json
@login_required
def checkout(request):
     if request.user.is_authenticated:
        order,created=OrderBasket.objects.get_or_create(user=request.user,complete=False)
        items=order.basket.all()
        userShipping = True
        try:
            userShipping=ShippingAdress.objects.get(user=request.user)
        except:
            userShipping = False
     else:
        items=[]
        order={"get__total":0}
     context={
        "items":items,
        "order":order,
        "usershipping":userShipping,
     }
     return render(request,'checkout.html',context)


def contact(request):
    return render(request,'contact.html')

@login_required
def order_success(request):
    shipping=ShippingAdress.objects.get(user=request.user)
    context={
        "shipping":shipping,
    }
    return render(request,'order-success.html',context)


def wishlist(request):
    return render(request,'wishlist.html')


def cart(request):
    if request.user.is_authenticated:
        order,created=OrderBasket.objects.get_or_create(user=request.user,complete=False)
        items=order.basket.all()
        
        
    else:
        try:
          cart=json.loads(request.COOKIES["cart"])
          
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
    context={
        "items":items,
        "order":order
     }
    
    return render(request,'cart.html',context)


