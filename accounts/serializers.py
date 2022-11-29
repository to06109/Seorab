from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True
    )

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            platform_type=validated_data['platform_type'],
            password=validated_data['password']
        )
        return user
    class Meta:
        model = User
        fields = ['email', 'username', 'platform_type', 'password']

class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(max_length=255, write_only=True)
    platform_type = serializers.ChoiceField(choices=User.PLATFORM_CHOICES, default='general')

    def validate(self, data):
        platform_type = data.get("platform_type", None)
        if platform_type == 'general':
            print("in general")
            email = data.get("email", None)
            password = data.get("password", None)
            if email is None:
                raise serializers.ValidationError(
                    'Email required'
                )
            user = authenticate(email=email, password=password)
        else:
            print("in google")
            email = data.get("email", None)
            password = data.get("password", None)
            print(email)
            if email is None:
                raise serializers.ValidationError(
                    'Email required'
                )
            user = authenticate(email=email, password=password)
            print(user)

        if user is None:
            raise serializers.ValidationError(
                "User Not Found"
            )
        return {
            'email': user.email
        }