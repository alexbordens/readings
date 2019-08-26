import pandas as pd

def daily_readings(df, start_date, end_date):
    '''
    '''
    # Create a dataframe of all days between start and end date
    date_frame = generate_daily_frame(start_date, end_date)
    
    # Aggregate by day
    daily_count = readings_by_day(df).reset_index()
    
    # Join daily count to the frame of all dates and fill in any missing values with 0
    daily_readings = date_frame.merge(daily_count, on = 'date', how = 'left')
    daily_readings = daily_readings.fillna(0)

    # Calculate cumulative page count
    daily_readings = cumulative_readings_by_day(daily_readings)

    # Add targets
    daily_readings = add_targets(daily_readings)

    return daily_readings


def generate_daily_frame(start_date, end_date):
	'''
	Takes a start date and end date
	Returns a dataframe of all dates including and between the start and end date
	'''

	df = pd.DataFrame({'date': [start_date, end_date]})
	dates = pd.date_range(min(df['date']), max(df['date']))
	df = df.set_index('date').reindex(dates).rename_axis('date').reset_index()

	return df

def readings_by_day(df):
	'''
	* Daily reading count
	'''
    a = []
	return df.groupby('date').sum().drop('page', 1)


def cumulative_readings_by_day(df):
	'''
    * Calculate cumulative page count
	'''
	df['cumulative'] = df['page_count'].cumsum()
	
	return df

def add_targets(df):
    '''
    * cumulative_target: number; Rolling count of 30 pages per day
    * met_goal: boolean; Daily goal of 30 pages met
    * on_pace: boolean: Cumulative meets/exceeds target
    * diff_to_target: number; Difference between daily target and actual
    * diff_to_cumulative: number; Difference between cumulative target and actual
    '''
    # Set daily target as constant
    df['daily_target'] = 30

    # Calculate daily target
    df['met_goal'] = df['page_count'].apply(lambda x: x >= 30)
    df['diff_to_target'] = df['page_count'] - df['daily_target']

    # Calculate cumulative targets
    df['cumulative_target'] = df['daily_target'].cumsum()
    df['diff_to_cumulative'] = df['cumulative'] - df['cumulative_target']
    df['on_pace'] = df['cumulative'] >= df['cumulative_target']

    # Remove constant
    df = df.drop('daily_target', axis = 1)
    
    return df
