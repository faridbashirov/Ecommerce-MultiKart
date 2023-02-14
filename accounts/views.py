from django.shortcuts import render,redirect
from django.views.generic import CreateView,ListView,View,UpdateView
from django.contrib.auth.views import LoginView,LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy,reverse
from .forms import RegisterForm,LoginForm,UserPasswordResetForm,UserPasswordResetConfirmForm,ShippingAdressForm,ProfileUpdateForm
from django.contrib import messages
from django.contrib.auth import get_user_model,authenticate
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.decorators import login_required
from .tokens import account_activation_token
from django.contrib.auth.views import PasswordResetView,PasswordResetConfirmView,TemplateView
from django.contrib.sites.shortcuts import get_current_site
from .tasks import send_confirmation_mail
from orders.models import *
from .models import ShippingAdress

import json
User=get_user_model()



class RegisterView(CreateView):
    form_class=RegisterForm
    template_name="register.html"
    success_url=reverse_lazy("login")
    
    def form_valid(self, form):
         result=super().form_valid(form)
         print(self.object)
         send_confirmation_mail(user=self.object,current_site=get_current_site(self.request))
         messages.add_message(self.request, messages.INFO, 'We send you a confirmation mail,please check your mailbox to complete your registration')
         return result
        
    
class ActivatAccauntView(View):
    
    def get(self,request,uidb64,token,*args, **kwargs):
       try:
         uid = force_str(urlsafe_base64_decode(uidb64))
         user = User.objects.get(pk=uid)
       except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

       if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        messages.warning(request,"Your accaunt activated")  
        
        return redirect(reverse_lazy('login'))
       else:
         messages.warning(request,"somtehing went wrong")   

def forget_pwd(request):
    return render(request,'forget_pwd.html')

def login(request):
    return render(request,'login.html')
class LoginView(LoginView):
    form_class=LoginForm
    template_name ="login.html"
    success_url=reverse_lazy("home")
    def get_success_url(self):
        nextpage= self.request.GET.get("next" , "/")
        cart=json.loads(self.request.COOKIES["cart"])
        
        
        if len(cart)>0:
          for i in cart:
              product=Product.objects.get(id=i)
              
              order,created=OrderBasket.objects.get_or_create(user=self.request.user,complete=False)
              orderItem,created=OrderItem.objects.get_or_create(product=product,order=order,color=cart[i]["color"],size=cart[i]["size"])
              orderItem.quantity+=int(cart[i]["quantity"])
              orderItem.save()
              self.request.COOKIES["cart"]={}
        messages.add_message(self.request, messages.INFO, 'Login oldunuz.')
     
        return str(nextpage) 
    
    
    

@login_required
def UserProfile(request):
    
    model=User.objects.get(id=request.user.id)
    model2=ShippingAdress.objects.all()
    form_class=ProfileUpdateForm(instance=model)
    second_form_class=ShippingAdressForm()
    try:
         usershipping=ShippingAdress.objects.get(user=request.user.id)
         second_form_class=ShippingAdressForm(instance=usershipping)
    except:
         second_form_class=ShippingAdressForm()
    if request.method == "POST":
         form = ProfileUpdateForm(request.POST)
         form2 = ShippingAdressForm(request.POST)
         if form.is_valid() and form2.is_valid():
           try:
              profile=User.objects.get(id=request.user.id)
              profile.email=form.cleaned_data["email"]
              profile.first_name=form.cleaned_data["first_name"]
              profile.last_name=form.cleaned_data["last_name"]
              profile.save(update_fields=['email',"first_name","last_name"])
           except:
              pass 
           try:
                p=ShippingAdress.objects.get(user=request.user.id)
                p.flat=form2.cleaned_data["flat"]
                p.zip_code=form2.cleaned_data["zip_code"]
                p.city=form2.cleaned_data["city"]
                p.address=form2.cleaned_data["address"]
                p.country=form2.cleaned_data["country"]
                p.region_state=form2.cleaned_data["region_state"]
                p.save(update_fields=['flat',"zip_code","city","address","country","region_state"])
           except:
                form2.instance.user=request.user
                form2.save()
           return redirect(reverse_lazy("profile"))
    context={
        "form":form_class,
        "form2":second_form_class
    }
    return render(request,"profile.html",context)
    # if request.method == "POST":
    
    # def post(self, request, *args, **kwargs):
    #     self.object = self.get_object()
    #     form = self.form_class(request.POST)
    #     form2 = self.second_form_class(request.POST)
        
    #     if form.is_valid() and form2.is_valid():
    #         print("here")
    #         try:
    #           profile=User.objects.get(id=request.user.id)
    #           profile.email=form.cleaned_data["email"]
    #           profile.first_name=form.cleaned_data["first_name"]
    #           profile.last_name=form.cleaned_data["last_name"]
    #           profile.save(update_fields=['email',"first_name","last_name"])
              
    #         except:
    #           pass
              
            
    #         try:
    #             p=ShippingAdress.objects.get(user=self.request.user.id)
    #             p.flat=form2.cleaned_data["flat"]
    #             p.zip_code=form2.cleaned_data["zip_code"]
    #             p.city=form2.cleaned_data["city"]
    #             p.address=form2.cleaned_data["address"]
    #             p.country=form2.cleaned_data["country"]
    #             p.region_state=form2.cleaned_data["region_state"]
    #             p.save(update_fields=['flat',"zip_code","city","address","country","region_state"])
    #         except:
    #             form2.instance.user=request.user
    #             form2.save()
    #         messages.add_message(self.request, messages.INFO, 'Settings saved successfully')
           
    #         return super().post(request, *args, **kwargs)
    #     else:
    #         return self.render_to_response(
    #           self.get_context_data(form=form, form2=form2))
class LogoutView(LogoutView,View):
    next_page=reverse_lazy("login")
    
    def get(self, request, *args, **kwargs):
        
        context = self.get_context_data(**kwargs)
        # self.request.COOKIES["cart"]={}
        return self.render_to_response(context)

class UserPasswordResetView(PasswordResetView):
    template_name = 'forget_pwd.html'
    form_class=UserPasswordResetForm
    email_template_name = 'password-reset.html'
    success_url = reverse_lazy('forget_pwd')
    def get_success_url(self):
        messages.add_message(self.request, messages.INFO, 'Parolunuzu yenilemek haqqinda istey mailinize gonderilmistir')
        return self.success_url

class UserPasswordResetConfirmView(PasswordResetConfirmView):
    template_name = 'password-reset-confirm.html'
    form_class=UserPasswordResetConfirmForm
    success_url=reverse_lazy("login")
    def get_success_url(self):
        
        messages.add_message(self.request, messages.INFO, 'Parolunuz deyisildi')
     
        return self.success_url
