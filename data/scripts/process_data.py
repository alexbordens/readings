import pandas as pd

def process_data(df):
	frames = []

	for title, table in df.groupby('id'):
		print('Preparing {} readings'.format(title))

		table = prepare_data(table)
		table = daily_count(table)

		frames.append(table)

	new_df = pd.concat(frames).reset_index(drop = True).drop(columns = ['pages', 'page'])

	return new_df


def prepare_data(df):
	df = fill_missing_dates(df)
	df = fill_missing_values(df)

	return df


def fill_missing_dates(df):
	dates = get_dates_offset_one(df)
	df = df.set_index('date').reindex(dates).rename_axis('date').reset_index()

	return df


def get_dates_offset_one(df):
	start_date = min(df['date']) - pd.offsets.Day(1)
	end_date = max(df['date'])

	return pd.date_range(start_date, end_date)


def fill_missing_values(df):
	df[['page', 'id']] = df[['page', 'id']].fillna(method='ffill')
	df['id'] = df['id'].fillna(method='bfill')
	df = df.fillna(0)

	return df


def daily_count(df):
	df['page_count'] = df['page'] - df['page'].shift(1)
	df = df.fillna(0)

	return df