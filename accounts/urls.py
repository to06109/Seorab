from django.urls import path, include
from . import views


app_name = 'accounts'
urlpatterns = [
    path('signup/', views.UserCreate.as_view(), name='sign up'),
    path('signin/', views.UserGeneralLogin.as_view(), name='sign in'),
]