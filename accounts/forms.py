from django import forms
from django.contrib.auth import get_user_model,authenticate,password_validation
from django.contrib.auth.password_validation import validate_password
from django.utils.text import capfirst
from django.core.exceptions import ValidationError
from .models import ShippingAdress
from django.contrib.auth.forms import AuthenticationForm,UserCreationForm,PasswordResetForm,SetPasswordForm
User=get_user_model()


class LoginForm(AuthenticationForm):
    username=forms.CharField(widget=forms.TextInput(attrs={"class": "form-control","placeholder": "Username"}))
    password=forms.CharField(widget=forms.PasswordInput(attrs={"class": "form-control","placeholder": "Password"}), validators=[validate_password])
    
    def get_invalid_login_error(self):
            self._errors['username']=[]
            return ValidationError(
             
             self._errors['username'].append("Username is not found")
            
        )
    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        
        if username is not None and password:
            self.user_cache = authenticate(self.request, username=username, password=password)
            print( self.user_cache )
            if self.user_cache is None:
                raise self.get_invalid_login_error()
            else:
                self.user_cache.is_active=True
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data
class RegisterForm(UserCreationForm):
    password1=forms.CharField(widget=forms.PasswordInput(attrs={"class": "form-control","placeholder": "Password"}), validators=[validate_password])
    password2=forms.CharField(widget=forms.PasswordInput(attrs={"class": "form-control","placeholder": "Confirm password"}), validators=[validate_password])
    class Meta:
        model=User
        fields=(
            "first_name",
            "last_name",
            "email",
            "username",
            "password1",
            "password2",
        )
        widgets={
          "first_name": forms.TextInput(attrs={'class': 'form-control',"placeholder": "First Name",}),
          "last_name": forms.TextInput(attrs={'class': 'form-control',"placeholder": "Last Name",}),
          "email": forms.EmailInput(attrs={'class': 'form-control',"placeholder": "Email",}),
          "username": forms.TextInput(attrs={'class': 'form-control',"placeholder": "Username",}),
        }
    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        user.is_active=False
        if commit:
            user.save()
        return user
        
class UserPasswordResetForm(PasswordResetForm):
    
     email = forms.EmailField(
        
        max_length=254,
        widget=forms.EmailInput(attrs={'autocomplete': 'email','class': 'form-control',"placeholder": "Email",}),
    )
class UserPasswordResetConfirmForm(SetPasswordForm):
    
     new_password1 = forms.CharField(
        label=("New password"),
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password','class': 'form-control',"placeholder": "New Password",}),
        strip=False,
        help_text=password_validation.password_validators_help_text_html(),
    )
     new_password2 = forms.CharField(
        label=("New password confirmation"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password','class': 'form-control',"placeholder": "Confirm Password",}),
    )
class ShippingAdressForm(forms.ModelForm):
    class Meta:
        model=ShippingAdress
        fields=["flat","zip_code","city","address","country","region_state"]
        COUNTRY_CHOICES = (
                
                ('Azerbaijan', 'Azerbaijan'), #First one is the value of select option and second is the displayed value in option
                ('Turkey', 'Turkey'),
                ('Poland', 'Poland'),
                ('Russia', 'Russia'),
               
                )
     
           
        
        widgets={
          "flat": forms.TextInput(attrs={'class': 'form-control',"placeholder": "flat",}),
          "zip_code": forms.NumberInput(attrs={'class': 'form-control',"placeholder": "zip_code",}),
          "address": forms.TextInput(attrs={'class': 'form-control',"placeholder": "address",}),
          'country': forms.Select(choices=COUNTRY_CHOICES,attrs={'class': 'form-control',"placeholder": "address"}),
          "region_state": forms.TextInput(attrs={'class': 'form-control',"placeholder": "region_state",}),
          "city": forms.TextInput(attrs={'class': 'form-control',"placeholder": "city",}),
          
        }
class ProfileUpdateForm(forms.ModelForm) :
     class Meta:
         model=User
         fields=["first_name","last_name","email"]
         widgets={
          "first_name": forms.TextInput(attrs={'class': 'form-control',"placeholder": "First Name",}),
          "last_name": forms.TextInput(attrs={'class': 'form-control',"placeholder": "Last Name",}),
          "email": forms.EmailInput(attrs={'class': 'form-control',"placeholder": "Email",}),
          
        }