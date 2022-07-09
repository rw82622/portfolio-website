from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('projects', views.projects, name='projects'),
    path('skills', views.skills, name='skills'),
    path('contact', views.contact, name='contact'),
    path('numberGuessingGame', views.numberGuessingGame, name='numberGuessingGame'),
]