#!/usr/bin/env python

import os
import re


txt_finder = re.compile(r"txt$")


def rename_if_needed(full_file):
    print(full_file)
    if txt_finder.search(full_file):
        return
    new_name = full_file + ".txt"
    print(f"{full_file} -> {new_name}")
    os.rename(full_file, new_name)


def main():
    print("!!!!!!!!!!!!!!!!!!!")
    print("This will rename all files in data/ RECURSIVELY to have a .txt extension.")
    print("!!!!!!!!!!!!!!!!!!!")
    print("")
    # if input("Are you sure? (y/n) >") != "y":
    #     print("Quitting..")
    #     exit()

    rootdir = "./data"
    for subdir, dirs, files in os.walk(rootdir):
        for file in files:
            full_file = os.path.join(subdir, file)
            rename_if_needed(full_file)


if __name__ == "__main__":
    main()
