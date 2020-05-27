#!/usr/bin/env python3

import os
import csv
from datetime import datetime, timedelta

def gen_hr_tuples(filename):
    folder = "heart_rate_files"
    full_path = os.path.join(folder, filename)
    with open(full_path, newline="") as csvfile:
        reader = csv.reader(csvfile)

        # skip meta data
        for i in range(14):
            next(reader)

        # get start time
        _, starttime_str, *_ = next(reader)
        starttime = datetime.strptime(starttime_str, "%Y-%m-%d %H:%M:%S +0000")

        next(reader) # skip header

        for sec, hr, *_ in reader:
            dt = starttime + timedelta(seconds=int(sec)-1)
            yield (dt, int(hr))

if __name__ == "__main__":
    filename = "2020-5-24-1.csv"
    full_path = os.path.join(folder, filename)
    for pair in gen_hr_tuples(full_path):
        print(pair)
