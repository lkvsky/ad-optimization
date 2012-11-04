import json
import csv


def get_json():
	# function to open/read csv file
	# remove header and 'time x' column
	# remove trailing white spaces
	# print json
	f = open('ad_opt_training_set_1.csv', 'rU')
	reader = csv.reader(f)
	csv_data = []
	for row in reader:
	    row.pop(0)
	    row.pop(-1)
	    csv_data.append(row)
	csv_data.pop(0)
	for line in csv_data:
		line = [map(int, x) for x in line]
	json_data = json.dumps(csv_data)
	return json_data

def write_js():
	# open the converted data js file
	# write or override with, setting a variable
	# with the array of arrays
	f = open('js/converted-data.js', 'w')
	new_data = get_json()
	full_js = "var adData = " + new_data + ";"
	f.write(full_js)
	f.close()

write_js()