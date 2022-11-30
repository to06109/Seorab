from datetime import date

from django.db import models
from django.utils import timezone

from accounts.models import User
from category.models import Category

class Contents(models.Model):
    class Meta:
        db_table = "Contents"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    link = models.URLField()
    image = models.URLField()
    text = models.TextField()
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    contents_x = models.FloatField()
    contents_y = models.FloatField()
    edit_date = models.DateTimeField(auto_now=True)