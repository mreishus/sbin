In this folder, we're collecting a data set to use to train the model.

## `./data`

Inside the 'data' folder, there is one folder for each language. Examples:

- `data/ruby`
- `data/elixir`
- `data/python`

Etc. Each is filled with examples of the programming language.

I'm currently manually copying arbitrary source files that I have sitting
around on my harddrive to build a data set. It's not a very robust method,
yet. Perhaps some sort of automated download builder would be better.

I'm using `cpmd5` so I can copy multiple files with the same name and have
these land in the same directory. For example, my `aoc` project has two
different files named `day03.exs`, and I want both of them without having to
manually rename.

## `.txt extension required`

Because of the way the fastai library works, each file needs to end in `.txt`.
The `./rename_to_txt.py` will help with this.

## `./data_tok`

This is automatically created by the notebooks in a later step.
