from core.forms import SubscriberForm

def inject_form(request):

 return {'form1': SubscriberForm()}