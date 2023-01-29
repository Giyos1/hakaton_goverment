from django.contrib import admin
from news.models import News, RegionStatus


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    exclude = ['label', 'published', "region", 'title']
    list_display = ['title', 'content', 'label', 'published', "region"]
    # exclude_list = ['label', 'published']

    # def get_exclude(self, request, obj=None):
    #     if not request.user.is_superuser:
    #         return self.exclude_list
    #     # return []
    #     super().get_exclude(request, obj)


@admin.register(RegionStatus)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('name', "yomon", "yaxshi", "ikkalasiyam")
