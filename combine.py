#!/usr/bin/env python3

def combine(time_gpx_pairs, time_hr_pairs):
    hr_pairs = list(time_hr_pairs)
    new_start = 0 # will remove items in the list after they are used

    for gpx_t, coordinates in time_gpx_pairs:
        for i, pair in enumerate(hr_pairs):
            hr_t, hr = pair
            if gpx_t == hr_t:
                new_start = i + 1
                yield (coordinates, hr)
                break
            elif gpx_t > hr_t:
                continue
            else: # time of gps point is earlier than time in hr file
                new_start = i
                yield (coordinates, 0)
                break
        hr_pairs = hr_pairs[new_start:]
