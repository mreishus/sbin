# Classify

Here, we're building a text classifier to discriminate across programming
languages.  Given a snippet of text, it should be able to make a resonable
guess what programming language it belongs to.  This is done by training
a [AWD-LSTM](https://arxiv.org/abs/1708.02182) model.

## Open Questions

- Does tokenization designed for english text work on source code?
- How much training data do I need?
- How diverse does the code need to be?
For example, I used all of the rails sourcecode as ruby data.  Is this teaching
the model 'the essence of ruby' or simply the variable names that the rails
team likes to use?

The results of the model seem to be promising even if the data is small and not that diverse.

## Preqreqs

- fastai v2 installed. https://github.com/fastai/fastai2
- fastcore intsalled. https://github.com/fastai/fastcore

I recommend using anaconda and using editable versions of those two libraries.
This is because they're not released and are still in heavy development as of
5/19/2020.

```
cd ~/ai
git clone https://github.com/fastai/fastai2
cd fastai2
conda env create -f environment.yml
conda activate fastai2
pip install -e ".[dev]"

cd ..
git clone https://github.com/fastai/fastcore
cd fastcore
pip install -e ".[dev]"
```

## Note: Data is Missing

- The training data and the model itself are not committed to github currently.
  They're too large.

## Step 1: Collect training data

Manually collect files in `01-get-data/data/`.

## Step 2: Train model

Run the notebook in `02-model/classify.ipynb`.  Make sure you activate the `fastai2` conda environment before running it.

```bash
conda activate fastai2
jupyter notebook
```

## Step 3: Build inferrer

WIP on building a small webservice.  Currently, play around with the inferring
script located in 03-web.
