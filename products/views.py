from django.shortcuts import render
from products.models import Product,PropertyValues,Vendor,Category,Review
from django.http import JsonResponse
from datetime import datetime,timedelta
from django.urls import reverse_lazy
from django.views.generic.edit import FormMixin
from orders.models import *
from django.shortcuts import get_object_or_404
from django.utils.translation import gettext as _
from .forms import ReviewForm
from django.db.models import QuerySet
import json
from django.http import Http404
from django.views import View
from django.core.exceptions import ImproperlyConfigured
from  django.views.generic  import ListView,DetailView,TemplateView,CreateView,UpdateView






class CategoryView(DetailView):
    model=Product
    template_name ="category-page.html"
    context_object_name="product"
    queryset=Product.objects.all()
    
    def get_object(self, queryset=None):
  
        if queryset is None:
          queryset = self.get_queryset()
    
          pk = self.kwargs.get(self.pk_url_kwarg)
          slug = self.kwargs.get(self.slug_url_kwarg)
        if pk is not None:
          queryset = queryset.filter(pk=pk)
   
        if slug is not None and (pk is None or self.query_pk_and_slug):
          slug_field = self.get_slug_field()
          if queryset.filter(category__parent_id__parent_id__slug=slug):
             queryset = queryset.filter(category__parent_id__parent_id__slug=slug)
             
          elif  queryset.filter(category__parent_id__slug=slug):
              queryset = queryset.filter(category__parent_id__slug=slug)
             
   
        if pk is None and slug is None:
           raise AttributeError(
            "Generic detail view %s must be called with either an object "
            "pk or a slug in the URLconf." % self.__class__.__name__
        )
        try:
        # Get the single item from the filtered queryset
           obj = queryset.filter()
        except queryset.model.DoesNotExist:
           raise Http404(
            _("No %(verbose_name)s found matching the query")
            % {"verbose_name": queryset.model._meta.verbose_name}
        )
        return obj
    
    def get_context_data(self,*args, **kwargs):
        context= super().get_context_data(**kwargs)
        
        context["size"]=PropertyValues.objects.filter(property_id=1)
        context["color"]=PropertyValues.objects.filter(property_id=2)
        context["brand"]=Vendor.objects.all()
        
        # date=datetime.today()
        # enddate=datetime.today() - timedelta(days=7)
        context["new"]=Product.objects.order_by("created_at")[:3]
        context["new2"]=Product.objects.order_by("created_at")[3:6]
       
        
        
        return context
class ProductView(FormMixin,DetailView):
    model=Product
    template_name="product-page.html"
    form_class = ReviewForm
    
    def get_success_url(self):
        url = self.object.get_absolute_url
        
        return f'/{url}'
    def get_context_data(self, **kwargs):
        
        context= super().get_context_data(**kwargs)
        prod = get_object_or_404(Product, slug = self.kwargs.get('slug'))
        categories = Category.objects.all()
        if not prod.category.parent_id:
            get_object_or_404(categories, id=prod.category.id, slug = self.kwargs.get('cat_slug'))
             
           
        elif not prod.category.parent_id.parent_id:
            get_object_or_404(categories, id=prod.category.id, slug = self.kwargs.get('cat_slug'))
            get_object_or_404(categories, id=prod.category.parent_id.id, slug = self.kwargs.get('maincat_slug'))
        elif not prod.category.parent_id.parent_id.parent_id:
            get_object_or_404(categories, id=prod.category.id, slug = self.kwargs.get('cat_slug'))
            get_object_or_404(categories, id=prod.category.parent_id.id, slug = self.kwargs.get('maincat_slug'))
            get_object_or_404(categories, id=prod.category.parent_id.parent_id.id, slug = self.kwargs.get('mainmaincat_slug'))
       
        if prod.category.parent_id.parent_id.slug==self.kwargs.get('mainmaincat_slug'):
            context["relatedproducts"]=Product.objects.filter(category__parent_id__parent_id__slug=self.kwargs.get('mainmaincat_slug'))
            
        elif  prod.category.parent_id:
            context["relatedproducts"]=Product.objects.filter(category__parent_id__parent_id__slug=self.kwargs.get('maincat_slug'))
              
        else:
            context["relatedproducts"]=Product.objects.filter(category__parent_id__parent_id__slug=self.kwargs.get('cat_slug'))
            
        context["color"]=PropertyValues.objects.filter(property_id=2)  
        context["size"]=PropertyValues.objects.filter(property_id=1)
        context["color"]=PropertyValues.objects.filter(property_id=2)
        context["brand"]=Vendor.objects.all()
        context["reviews"]=Review.objects.filter(product=prod)
        context["new"]=Product.objects.order_by("created_at")[:3]
        context["new2"]=Product.objects.order_by("created_at")[3:6]
        context["form"]=self.get_form()
        return context
    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        
        form = self.get_form()
    
        if form.is_valid():
             
             return self.form_valid(form)
        else:
             return self.form_invalid(form)
        

    def form_valid(self, form):
            
            form.instance.product=self.get_object()
            form.instance.user=self.request.user 
            form.save()
            return super().form_valid(form)
    
    
    
    

def UpdateItem(request):
    data=json.loads(request.body)
    productId=data["productID"]
    action=data["action"] 
    quantity=data["quantity"]
    color=data["color"]
    size=data["size"]
    
    product=Product.objects.get(id=productId)
    order,created=OrderBasket.objects.get_or_create(user=request.user,complete=False)
    orderItem,created=OrderItem.objects.get_or_create(product=product,order=order,size=size,color=color)
    
    if action == 'add':
        
        orderItem.quantity+=1
    elif action=="first_add":
        orderItem.quantity+=int(quantity)
    elif action == "remove":
        
        orderItem.quantity-=1
    
    orderItem.save()
    if orderItem.quantity <=0 or action == "delete":
        orderItem.delete()
    return JsonResponse("item was added", safe=False)
    
    
    
def vendor(request,slug):
    
    Vendor= get_object_or_404(Vendor, slug=slug)
    print(Vendor)
    return render(request,"vendor-profile.html")
