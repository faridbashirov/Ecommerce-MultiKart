from django import forms
from core.models import Contact,Subscriber

class ContactForm(forms.ModelForm):
    class Meta:
        model=Contact
        fields=('first_name', 'last_name', 'email', 'phone', 'message',)
        widgets={
        "first_name": forms.TextInput(attrs={'placeholder': 'First Name','class': 'form-control','id':'name'}),
        "last_name": forms.TextInput(attrs={'placeholder': 'Last Name',"class": "form-control","id":"last_name"}),
        "email": forms.EmailInput(attrs={'placeholder': 'Email','class': "form-control","id":"email"}),
        "phone": forms.TextInput(attrs={'placeholder': 'Phone','class': "form-control","id":"review"}),
        "message": forms.Textarea(attrs={'placeholder': 'Write your message','class': "form-control","id":"review","rows":6}),
    }
      
class SubscriberForm(forms.ModelForm):
    class Meta:
        model=Subscriber
        fields=('email',)
        widgets={
         "email": forms.EmailInput(attrs={'placeholder': 'Email','class': "form-control","id":"email"}),}