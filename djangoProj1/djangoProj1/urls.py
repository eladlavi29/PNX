"""
URL configuration for djangoProj1 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include   # added


print('GOT TO djangoProj1/URLS.PY, THANK YOU!')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello-world/', include('api1.urls')),      #added   (previously it was:  path('api/', include...)
    path('api2/', include('api2.urls'))      # added   #path('alohaworld/', include('api2.urls'))
]

print(f"urlpatterns = '{urlpatterns}'")
