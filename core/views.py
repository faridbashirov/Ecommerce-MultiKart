from urllib import request
from django.shortcuts import render
from products.models import *
from orders.models import *
from django.http import JsonResponse
from django.views.generic import CreateView,ListView,View
from django.urls import reverse_lazy
from django.contrib import messages

from core.forms import ContactForm,SubscriberForm
import json
def home(request):
    category=Category.objects.all()
    prod=Product.objects.filter(discount_type__isnull=False)
    
    color=PropertyValues.objects.filter(property_id=2)  
    new=Product.objects.order_by("-created_at")[0:5]
    order=OrderBasket.objects.filter(complete=True)
    bestsellers=[]
    for i in order:
        for j in i.basket.all():
            if f"{j.product.id}" not in bestsellers:
                bestsellers.append(f"{j.product.id}")
                
    bestproducts=Product.objects.filter(id__in=bestsellers)
    
    context = {
        "category":category,
        "prod":prod,
        "color":color,
        "new":new,
        "bestsellers":bestproducts
    }
    return render(request,'index.html',context)
def subscribe(request):
      form=SubscriberForm()
      datas=json.loads(request.body)
      form=SubscriberForm(data=datas)
      if form.is_valid():
          form.save()
      return JsonResponse("subscribed", safe=False)
    
    

def error(request):
    return render(request,'404.html')

def about_page(request):
    return render(request,'about-page.html')

def faq(request):
    return render(request,'faq.html')   

class Search(ListView):
    model=Product
    template_name="search.html"
    context_object_name="prods"
    def get_queryset(self):
        
        q=self.request.GET.get("q")
        if q:
            query= self.model.objects.filter(title__icontains=q)
            print(query)
            return  self.model.objects.filter(title__icontains=q)
            
              
        return self.model.objects.all()
    def get_context_data(self,**kwargs):
      context = super(Search,self).get_context_data(**kwargs)
      context['color'] = PropertyValues.objects.filter(property_id=2)  
      return context
      
      
def search(request):
    return render(request,'search.html')   
class contact(CreateView):
    template_name="contact.html"
    form_class=  ContactForm
    success_url=reverse_lazy("contact")    
    


def handle_not_found(request,exception):

 return render(request,"404.html")
