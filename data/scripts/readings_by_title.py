import pandas as pd

def readings_by_title(df):
    '''
    Takes a dataframe as an argument

    Return a list of dictionaries
    '''
    by_title = []

    print(df.head())

    # Convert dates to strings
    df['date'] = df['date'].apply(lambda x: x.strftime('%Y-%m-%d'))

    for book, table in df.groupby('id'):

        table = table.loc[:, table.columns.intersection(['date', 'page_count'])]
        table['cumulative'] = table['page_count'].cumsum()

        title = {
            'title': book,
            'history': table.to_dict('records')
        }

        by_title.append(title)

    return by_title

if __name__ == "__main__":
    pass