from rest_framework import serializers
from .backends import AccountsBackend

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True
    )

    def create(self, validated_data):
        print("serializer create")
        print(validated_data)
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


class UserGoogleSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True
    )

    def create(self, validated_data):
        print("google create serializer")
        print(validated_data)
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            platform_type=validated_data['platform_type'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = ['email', 'platform_type', 'password']


class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(max_length=255, write_only=True)
    platform_type = serializers.ChoiceField(choices=User.PLATFORM_CHOICES, default='general')

    def validate(self, data):
        print('login validate on')
        platform_type = data.get("platform_type", None)

        if platform_type == 'general':
            print('in general')
            email = data.get("email", None)
            password = data.get("password", None)

            user = AccountsBackend.authenticate(data, email=email, password=password, platform_type=platform_type)

            if user is None:
                print('no user in general')
                raise serializers.ValidationError(
                    "User Not Found in general"
                )

        else:
            print('in google')
            print('google, data:', data)
            email = data.get("email", None)

            if email is None:
                raise serializers.ValidationError(
                    'Email required'
                )
            user = AccountsBackend.authenticate(data, email=email, platform_type=platform_type)

            if user is None:
                print('google user none.. will create')
                serializer = UserGoogleSerializer(data=data)
                print('serializer initialize')
                if serializer.is_valid():
                    print('serializer.is_valid')
                    serializer.save()
                    user = AccountsBackend.authenticate(data, email=email, platform_type=platform_type)
                    return user
                else:
                    print('serializer.not_valid')
                    print(data)
                    print(serializer.errors)
                    return serializers.ValidationError(
                        'Google registration Unavailable'
                    )
        return {
            'email': user.email
        }