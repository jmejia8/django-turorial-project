from django.shortcuts import render
#from django.views import generic

def index(request):
    context = {'message': 'Current message'}
    return render(request, 'maps/index.html', context)


def save_route(request):
    context = {'message': str(request.POST)}
    return render(request, 'maps/index.html', context)
