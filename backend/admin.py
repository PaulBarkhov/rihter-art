from profile import Profile
from django.contrib import admin
from . import models
# Register your models here.
admin.site.site_header = "Rihter Art Online - Панель администрирования"

class CourseDisplay(admin.ModelAdmin):
    list_display = ('name', 'description', 'get_lessons')
    def get_lessons(self, obj):
        return obj.lessons


admin.site.register(models.Profile)
admin.site.register(models.Course, CourseDisplay)
admin.site.register(models.LessonPack)
admin.site.register(models.Lesson)
admin.site.register(models.Comment)
admin.site.register(models.Photo)
admin.site.register(models.Order)
