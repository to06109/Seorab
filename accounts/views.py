from django.shortcuts import render
from rest_framework import generics, status, response

from .serializers import UserSerializer, UserLoginSerializer
from .models import User


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code = status.HTTP_201_CREATED
        responseJSON = {
            'success': "true",
            'status code': status_code,
            'message': "user registered successfully",
        }
        return response.Response(responseJSON, status=status_code)

class UserGeneralLogin(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        responseJSON = {
            "success": "True",
            "status_code": status.HTTP_200_OK,
            "message": "User Logged in",
        }
        status_code = status.HTTP_200_OK

        return response.Response(responseJSON, status=status_code)