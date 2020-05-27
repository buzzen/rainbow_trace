import sys
from gpx import gen_gpx_tuples
from hr import gen_hr_tuples
from combine import combine

if len(sys.argv) < 3:
    print('Usage: command <gpx_filename> <hr_filename>')
    sys.exit(1)

gpx_tuples = gen_gpx_tuples(sys.argv[1])
hr_tuples = gen_hr_tuples(sys.argv[2])

# combine gpx and hr tuples
gpx_hr_tuples = combine(gpx_tuples, hr_tuples)
for row in gpx_hr_tuples:
    print(row)