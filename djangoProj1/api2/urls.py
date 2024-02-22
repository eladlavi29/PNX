from django.urls import path
from . import views

urlpatterns = [
    path('alohaworld/', views.alohaworld, name='alohaworld'),
    path('ahlan/', views.ahlan, name='ahlan'),
]

print('GOT TO API2/UTRLS.PY, THANK YOU!')

