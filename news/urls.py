from django.urls import path
from news.views import OqitishAPIView,StatusAPIView

urlpatterns = [
    path('oqitish/db/read/', OqitishAPIView.as_view(), name='oqitish'),
    path('status/', StatusAPIView.as_view(), name='status'),
]
