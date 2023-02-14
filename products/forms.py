from django import forms
from .models import Review
class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ("name",
                  "email",
                  "comment",
                  "star")
        widgets={
          "name": forms.TextInput(attrs={'class': 'form-control',"placeholder": "Name",}),
          "email": forms.EmailInput(attrs={'class': 'form-control',"placeholder": "Email",}),
          "comment": forms.Textarea(attrs={'class': 'form-control',"placeholder": "comment",}),
        }
        
        