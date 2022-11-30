from .models import User


class AccountsBackend(object):

    def authenticate(self, email=None, password=None, platform_type=None):
        if platform_type == 'google':
            try:
                user = User.objects.get(email=email, platform_type=platform_type)
                return user
            except User.DoesNotExist:
                return None
        else:
            try:
                user = User.objects.get(email=email, platform_type=platform_type)
                if user.check_password(password) is True:
                    return user
            except User.DoesNotExist:
                return None
