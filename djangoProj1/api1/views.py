from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Creating views

print('GOT TO VIEWS.PY, THANK YOU!')

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world! (from server)'})


