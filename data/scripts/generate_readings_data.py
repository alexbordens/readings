import pandas as pd
import json
import os
from process_data import process_data
from daily_readings import daily_readings

if __name__ == '__main__':
	df = pd.read_csv('../source_data/daily-log.csv')
	df['date'] = pd.to_datetime(df['date'])

	# Process raw readings into daily tracking by titles
	readings = process_data(df)

	# Filter logs for 2018 readings
	CY18 = df[df['date'] <= pd.to_datetime('2018-12-31')]

	# Combine titles and create daily readings frame
	CY18_daily_readings = daily_readings(readings, min(CY18['date']), max(CY18['date']))

