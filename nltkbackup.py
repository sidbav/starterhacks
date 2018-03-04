import nltk
import random
from nltk.tokenize import sent_tokenize, word_tokenize,PunktSentenceTokenizer
from nltk.corpus import stopwords,state_union, movie_reviews




####Tutorial one (Pulling words)####
 
##example_text = "Hello Mr. Smith, how are you doing today? The weather is great and python is awesome. The sky is pink"

##print (sent_tokenize(example_text))
##
##print(word_tokenize(example_text))

##for i in word_tokenize(example_text):
##        print(i)

###Tutorial two (filtration) #### 

##example_sentence = "This is an example showing off stop word filtration"
##stop_words = set(stopwords.words("english"))
##
##words = word_tokenize(example_sentence)
##filtered_sentence = []
##
##for w in words:
##        if w not in stop_words:
##            filtered_sentence.append(w)
##print (filtered_sentence)


###Tutorial three (Speech tagging) ###
##train_text = state_union.raw("2005-GWBush.txt")
##sample_text = state_union.raw("2006-GWBush.txt")
##
##custom_sent_tokenizer = PunktSentenceTokenizer(train_text)
##
##tokenized = custom_sent_tokenizer.tokenize(sample_text)
##
##def process_content():
##    try:
##        for i in tokenized:
##            words = nltk.word_tokenize(i)
##            tagged = nltk.pos_tag(words)
##            chunkGram = r"""Chunk: {<RB.?>*<VB.?>*<NNP>+<NN>?}"""
##            chunkParser = nltk.RegexpParser(chunkGram)
##            chunked = chunkParser.parse(tagged)
##            chunked.draw()     
##
##    except Exception as e:
##        print(str(e))
##
##process_content()


##### Tutorial 11(text classification) ######

documents = []
for category in movie_reviews.categories():
     for fileid in movie_reviews.fileids(category):
         documents.append((list(movie_reviews.words(fileid)),category))
random.shuffle(documents)

all_words = []

for w in movie_reviews.words():
    all_words.append(w.lower())

all_words = nltk.FreqDist(all_words)


word_features = list(all_words.keys())[:3000]

def find_features(document):
    words = set(document)
    features = {}
    for w in word_features:
        features[w] = (w in words)

    return features

#print((find_features(movie_reviews.words('neg/cv000_29416.txt'))))
featuresets = [(find_features(rev), category) for (rev, category) in documents]
print(featuresets[0])

#training_set= featuresets[:1900]
#testing_set= featuresets[1900:]

#classifier = nltk.NaiveBayesClassifier.train(training_set)
#print("Naive Bayes Algo accuracy percent:", (nltk.classify.accuracy(classifier, testing_set))*100)
#classifier.show_most_informative_features(15)
