#!/usr/bin/python3
from flask import Flask
from flask import request
import nltk
import random
from nltk.tokenize import sent_tokenize, word_tokenize,PunktSentenceTokenizer
from nltk.corpus import qc, movie_reviews
import pickle

app = Flask(__name__)

documents = []
for category in movie_reviews.categories():
     for fileid in movie_reviews.fileids(category):
         documents.append((list(movie_reviews.words(fileid)),category))
random.shuffle(documents)

all_words = []
for w in movie_reviews.words():
    all_words.append(w.lower())

all_words = nltk.FreqDist(all_words)

word_features = list(all_words.keys())[:200]

def find_features(document):
    words = set(document)
    features = {}
    for w in word_features:
        features[w] = (w in words)

    return features

featuresets = [(find_features(rev), category) for (rev, category) in documents]

training_set= featuresets
testing_set= featuresets

reviewList = []
for feature in testing_set:
     (review,cat) = feature
     reviewList.append(review)

classifier = nltk.NaiveBayesClassifier.train(training_set)

# print((classifier.classify_many(reviewList)))

# print("Naive Bayes Algo accuracy percent:", (nltk.classify.accuracy(classifier, testing_set))*100)
# classifier.show_most_informative_features(15)

@app.route("/", methods=['GET'])
def hey():
    message = request.args.get('message')
    print(message)
    messageFeatures = find_features(message)

    if (classifier.classify(messageFeatures) == "pos"):
        return ("yes")
    else:
        return ("no")
