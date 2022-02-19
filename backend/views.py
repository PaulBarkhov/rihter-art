from xml.etree.ElementTree import tostring
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from rest_framework import viewsets
from .serializers import UserSerializer, ProfileSerializer
import json
import random
import vimeo

from . import models


# Create your views here.

def front(request):
    context = {}
    return render(request, "index.html", context)


@csrf_exempt
def registration_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            username = data["email"]
            firstName = data["firstName"]
            lastName = data["lastName"]
            email = data["email"]
            password = data["password"]

            user = User.objects.create_user(
                username, email, password)
            if user is not None:
                user.first_name = firstName
                user.last_name = lastName
                user.save()
                profile = models.Profile(
                    user=User.objects.get(username=username))
                profile.save()
                print("Success")
                return JsonResponse({"isRegistered": True})
            else:
                print("Failure")
                return JsonResponse({"isRegistered": False})
        except Exception as e:
            print("Ошибка" + str(e))
            return JsonResponse({"isRegistered": False, "error": str(e)})
    return render(request, 'index.html')


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        username = data["email"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            print("Success")
            return JsonResponse({"isAuthenticated": True})
        else:
            print("Failure")
            return JsonResponse({"isAuthenticated": False, "error": "Неверный Email или Пароль"})

    return render(request, 'index.html')


def logout_view(request):
    logout(request)
    return JsonResponse({"isLoggedOut": True})


def get_all_courses(request):
    profile = request.user.profile
    courses = []
    for course in models.Course.objects.all():
        number_of_free_lessons = len(course.lessons.filter(access='free').values()) + 1
        purchased_lessonPacks = profile.purchased_lessonPacks.filter(course = course)
        number_of_purchased_lessons = 0
        for purchased_lessonPack in purchased_lessonPacks:
            number_of_purchased_lessons = len(purchased_lessonPack.lessons.all().values()) + 1
        number_of_available_lessons = number_of_free_lessons + number_of_purchased_lessons
        total_number_of_lessons = len(course.lessons.all().values()) + 1
        prices = []
        lessonPacks = course.lessonPacks.all().values("price")
        for lessonPack in lessonPacks:
            prices.append(lessonPack['price'])
        course = course.__dict__
        del course['_state']
        courses.append({
            **course,
            'price': prices and min(prices) or 0,
            'number_of_available_lessons': number_of_available_lessons,
            'total_number_of_lessons': total_number_of_lessons
        })

    return JsonResponse(list(courses), safe=False)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = ProfileSerializer


def account_view(request):
    profile = models.Profile.objects.get(user=request.user.id)
    userData = {
        'email': request.user.email,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'profile_image': profile.profile_image.url,
        'language': profile.language,
        'birth_data': profile.birth_date,
        'status': profile.status,
    }
    # print(userData)
    return JsonResponse(userData)


def get_lessons(request, pk):
    course = models.Course.objects.get(id=pk)
    user = request.user
    profile = user.profile

    purchased_lessons = []
    purchased_lessonPacks = profile.purchased_lessonPacks.filter(course=course)
    for lessonPack in purchased_lessonPacks:
        purchased_lessons.extend(lessonPack.lessons.all().values())
    unavailable_lessons = []
    unavailable_lessonPacks = []
    lessonPacks = course.lessonPacks.all()
    for lessonPack in lessonPacks:
        if lessonPack not in purchased_lessonPacks:
            unavailable_lessonPack = {
                'id': lessonPack.id,
                'course': lessonPack.course.id,
                'name': lessonPack.name,
                'price': lessonPack.price,
                'videos': []
            }
            unavailable_lessonPack['videos'].extend(lessonPack.lessons.all().values('id', 'name'))
            unavailable_lessonPacks.append(unavailable_lessonPack)

    lessons = {
        'free_lessons': list(course.lessons.filter(access='free').values()),
        'purchased_lessons': purchased_lessons,
        'unavailable_lessonPacks': unavailable_lessonPacks
    }


    return JsonResponse(lessons)


def video(request, id):

    client = vimeo.VimeoClient(
        token='cdb545af77f9a20167ce2fc7cade0e6d',
        key='dae102dfd4fcbd7ea7589905bca70ca66dd0b222',
        secret='bveLTAzuaHShT3aux6159DZRAYek4rziWOp6zIx1ROKOumH76da3rweqoNmALiox8bo/7z3PPAWy6W9RF2p43D9ZfEvB9XLIc2fa7PIWx0ibH1+X/eiA3VRaByJUP1fU'
    )

    # Make the request to the server for the "/me" endpoint.
    video = client.get(f'https://api.vimeo.com/me/videos/{id}')

    return JsonResponse(video.json())


def auth(request):
    isAuthenticated = request.user.is_authenticated

    return JsonResponse({"isAuthenticated": isAuthenticated})


@csrf_exempt
def comments(request, pk):
    lesson = models.Lesson.objects.get(pk=pk)
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            comment = models.Comment(
                text=data["text"], lesson=lesson, user=request.user)
            if comment is not None:
                comment.save()
            return HttpResponse(status=200)
        except Exception as e:
            return HttpResponse(status=e.status)

    comments = list(lesson.comments.all().values())
    return JsonResponse(comments, safe=False)


def profile(requset, pk):
    user = User.objects.get(id=pk)
    profile = user.profile
    userData = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "birth_date": profile.birth_date,
        "language": profile.language,
        "profile_image": profile.profile_image.url,
        "status": profile.status
    },
    return JsonResponse(userData, safe=False)


@csrf_exempt
def verification_view(request):
    data = json.loads(request.body.decode("utf-8"))
    code = random.randint(1111, 9999)
    request.session['reset_password'] = {
        "email": data["email"],
        "code": code
    }
    send_mail(
        'Код подтверждения',
        f'Ваш код подтверждения: {code} \n\nЕсли вы не запрашивали код, игнорируйте это письмо и никому не говорите этот код. \n\n P.S. Привет всем пусечкам лапотусечкам',
        'pavelbarhov@gmail.com',
        [data["email"]],
        fail_silently=False,
    )
    return HttpResponse(status=200)


@csrf_exempt
def verify_code(request):
    data = json.loads(request.body.decode("utf-8"))
    if request.session['reset_password']['code'] == int(data["code"]):
        print('good')
        return HttpResponse(status=200)
    else:
        return HttpResponse('Неверный код', status=403)


@csrf_exempt
def new_password(request):
    data = json.loads(request.body.decode("utf-8"))
    user = User.objects.get(email=request.session['reset_password']['email'])
    if user is not None:
        user.set_password(data["password"])
        user.save()
        return HttpResponse(status=200)
    else:
        return HttpResponse('Что-то пошло не так', status=403)


@csrf_exempt
def upload_photo(request, pk):
    lesson = models.Lesson.objects.get(pk=pk)
    data = request.FILES['photo']
    # photo = models.Photo(lesson=lesson, name='qgertgerwf', url=data)
    # photo.save()
    return HttpResponse(status=200)


@csrf_exempt
def upload_profile_image(request):
    user = request.user
    profile = user.profile
    profile.profile_image = request.FILES['photo']
    profile.save()
    return HttpResponse(status=200)

@csrf_exempt
def buy_lessonPack(request):
    user = request.user
    profile = user.profile
    lessonPackID = json.loads(request.body.decode("utf-8"))['lessonPack']
    lessonPack = models.LessonPack.objects.get(pk=lessonPackID)
    profile.purchased_lessonPacks.add(lessonPack)
    print(lessonPack)

    return HttpResponse(status=200)