import email
from django.db import models

class AbstractModel(models.Model):
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)
    class Meta:
        abstract=True
class Contact(AbstractModel):
      first_name= models.CharField(max_length=255)
      last_name= models.CharField(max_length=255)
      phone= models.CharField(max_length=255)
      email= models.EmailField()
      message= models.TextField()

class Subscriber(models.Model):
    email=models.EmailField(max_length=55 ,unique=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    is_active=models.BooleanField(default=True)
