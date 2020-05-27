import os
import xml.etree.ElementTree as ET
import datetime

def gen_gpx_tuples(filename):
    folder = "gpx_files"
    tree = ET.parse(os.path.join(folder, filename))
    root = tree.getroot()
    ns = "{{{0}}}".format("http://www.topografix.com/GPX/1/1")

    trkpt_tags = (trkpt for trkpt in root.iter(ns + "trkpt"))
    next(trkpt_tags) # skip headers
    for trkpt_tag in trkpt_tags:
        lat, lon = float(trkpt_tag.get("lat")), float(trkpt_tag.get("lon"))
        time = datetime.datetime.strptime(trkpt_tag.find(ns + "time").text, 
            "%Y-%m-%dT%H:%M:%SZ")
        yield (time, (lat, lon))

if __name__ == "__main__":
    filename = "20200524.gpx"
    for pt in gen_gpx_tuples(filename):
        print(pt)