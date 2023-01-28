from django.contrib import admin
from news.models import News


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    exclude = ['label', 'published', "region"]
    list_display = ['title', 'content', 'label', 'published', "region"]
    # exclude_list = ['label', 'published']

    # def get_exclude(self, request, obj=None):
    #     if not request.user.is_superuser:
    #         return self.exclude_list
    #     # return []
    #     super().get_exclude(request, obj)
