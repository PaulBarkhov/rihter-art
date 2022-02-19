from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path("", views.front, name="front"),
    path("registration", views.registration_view, name="registration"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("get_all_courses", views.get_all_courses),
    path("account", views.account_view),
    path("get_lessons/<int:pk>", views.get_lessons),
    path("video/<int:id>", views.video),
    path("auth", views.auth),
    path("lesson/<int:pk>/comments", views.comments),
    path("profile/<int:pk>", views.profile),
    path("verification", views.verification_view),
    path("verify_code", views.verify_code),
    path("new_password", views.new_password),
    path("lesson/<int:pk>/upload_photo", views.upload_photo),
    path("upload_profile_image", views.upload_profile_image),
    path("buy_lessonPack", views.buy_lessonPack)
]
