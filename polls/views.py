from django.shortcuts import render
from django.http import HttpResponse
from .models import Question
from django.template import loader

def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "polls/index.html", context)

def detail(request, question_id):
    response = "Your are looking at question %s" % question_id
    return HttpResponse(response)

def results(request, question_id):
    response = "Your are looking at results of %s" % question_id
    return HttpResponse(response)

def vote(request, question_id):
    response = "Your are voting question %s" % question_id
    return HttpResponse(response)
