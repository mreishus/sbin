#!/usr/bin/env python

from fastai2.text.all import *

defaults.device = torch.device("cpu")
path = Path(".")
learner = load_learner("./export.pkl")

f = open("./test_ruby.txt", "r")
test_file_contents = f.read()

_, _, losses = learner.predict(test_file_contents)
cats = [learner.dls.categorize.decode(i) for i in range(len(losses))]

predictions = sorted(zip(cats, map(float, losses)), key=lambda p: p[1], reverse=True)
print(predictions)
