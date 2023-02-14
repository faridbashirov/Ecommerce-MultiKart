import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "MultiKart.settings")
app = Celery("MultiKart")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

#celery -A django_celery worker
#celery -A FaridLeman worker --beat --scheduler django --loglevel=info
 