from django.db import models

from accounts.models import User


class Category(models.Model):

    class Meta:
        db_table = "Category"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
