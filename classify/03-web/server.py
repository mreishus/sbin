#!/usr/bin/env python
"""
Programming-language guesser.

REQUIREMENTS:
    - A model named "./export.pkl" to be in the same directory.
    - pytorch and fastai2 libraries installed.

DESCRIPTION:

Starts a server on 0.0.0.0, port 8000 that
listens for POSTS to /predict.

It should contain formdata with field "text"
equal to a string.

It will guess what programming language that string is
and return an object with predictions. See example below.

EXAMPLE:

curl -X POST -F 'text=for i in range(10):' http://localhost:8000/predict

{"predictions":[["python",0.8328688740730286],["go",0.06257648020982742],["javascript",0.054476577788591385],["haskell",0.034811630845069885],["elixir",0.009497438557446003],["typescript",0.004690524190664291],["ruby",0.0010784142650663853]]}
"""

from starlette.applications import Starlette
from starlette.responses import JSONResponse
import uvicorn
import aiohttp
import base64
from fastai2.text.all import *

defaults.device = torch.device("cpu")
path = Path(".")
learner = load_learner("./export.pkl")

app = Starlette(debug=True)


def predict_language_from_string(s):
    _, _, losses = learner.predict(s)
    cats = [learner.dls.categorize.decode(i) for i in range(len(losses))]

    predictions = sorted(
        zip(cats, map(float, losses)), key=lambda p: p[1], reverse=True
    )
    return JSONResponse({"predictions": predictions})


@app.route("/predict", methods=["POST"])
async def predict(request):
    data = await request.form()
    s = data["text"]
    return predict_language_from_string(s)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
