from django.shortcuts import render
from rest_framework import generics, status, response

from .serializers import UserSerializer, UserLoginSerializer
from .models import User


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        print("view.usercreate.post")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            status_code = status.HTTP_201_CREATED
            responseJSON = {
                'success': "true",
                'status code': status_code,
                'message': "user registered successfully",
            }
            return response.Response(responseJSON, status=status_code)
        else:
            return response.Response(data="registration goes wrong", status=status.HTTP_400_BAD_REQUEST)

class UserLogin(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        print("view.userlogin.post")
        serializer = self.serializer_class(data=request.data)
        print("login serializer initialized")
        if serializer.is_valid():
            print("is_valid?")
            responseJSON = {
                "success": "True",
                "status_code": status.HTTP_200_OK,
              "message": "User Logged in",
            }
            status_code = status.HTTP_200_OK
            print(responseJSON.__str__())
            return response.Response(responseJSON, status=status_code)
        else:
            print(serializer.errors)
            return response.Response(data="wrong", status=status.HTTP_400_BAD_REQUEST)