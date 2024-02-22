from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
]

print('GOT TO API1/UTRLS.PY, THANK YOU!')

