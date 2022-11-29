from django.db import models, transaction
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    @transaction.atomic
    def create_user(self, email, username, platform_type, password=None):
        if not email:
            raise ValueError('Empty email not allowed')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            platform_type=platform_type,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, platform_type, password):
        user = self.create_user(
            email,
            password=password,
            username=username,
            platform_type=platform_type,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):

    class Meta:
        db_table = 'auth_user'

    email = models.EmailField(
        max_length=255,
        unique=True,
    )
    username = models.CharField(
        max_length=255,
    )
    PLATFORM_CHOICES = [
        ('google', 'google'),
        ('general', 'general'),
    ]
    platform_type = models.CharField(
        max_length=255,
        choices=PLATFORM_CHOICES,
        default='general',
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'platform_type']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin