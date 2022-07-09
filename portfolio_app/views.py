from django.shortcuts import render

def index(request):
    return render(request, 'portfolio_app/index.html')

def projects(request):
    return render(request, 'portfolio_app/projects.html')

def skills(request):
    return render(request, 'portfolio_app/skills.html')

def contact(request):
    return render(request, 'portfolio_app/contact.html')

def numberGuessingGame(request):
    return render(request, 'portfolio_app/numberGuess.html')