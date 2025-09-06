from flask import Flask, jsonify, request
import joblib

import yfinance as yf
import pandas as pd

import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
from datetime import date, timedelta

app = Flask(__name__)

apple = joblib.load('/models/AAPL.pkl')
amazon = joblib.load('/models/AMZN.pkl')
microsoft = joblib.load('/models/MSFT.pkl')
nvidia = joblib.load('/models/NVDA.pkl')

def set_periodic_variables():
    window = 14
    short_period = 12
    long_period = 26
    signal_line_period = 9
    
    return window, short_period, long_period, signal_line_period

def date_now():
    today = str(date.today() - timedelta(days=2))
    return today

def load_overall_dataset():
    today = date_now()
    df_apple_to_csv = yf.download("AAPL", start="2020-01-01", end=today)
    df_microsoft_to_csv = yf.download("MSFT", start="2020-01-01", end=today)
    df_amazon_to_csv = yf.download("AMZN", start="2020-01-01", end=today)
    df_nvidia_to_csv = yf.download("NVDA", start="2020-01-01", end=today)

    apple_path = 'training/datasets/apple.csv'
    microsoft_path = 'training/datasets/microsoft.csv'
    amazon_path = 'training/datasets/amazon.csv'
    nvidia_path = 'training/datasets/nvidia.csv'

    df_apple_to_csv.to_csv(apple_path)
    df_microsoft_to_csv.to_csv(microsoft_path)
    df_amazon_to_csv.to_csv(amazon_path)
    df_nvidia_to_csv.to_csv(nvidia_path)

    df_apple = pd.read_csv(apple_path)
    df_microsoft = pd.read_csv(microsoft_path)
    df_amazon = pd.read_csv(amazon_path)
    df_nvidia = pd.read_csv(nvidia_path)
    
    return df_apple, df_microsoft, df_amazon, df_nvidia

def load_dataset(ticker="", company=""):
    date_today = date_now()
    df_to_csv = yf.download(ticker, start="2020-01-01", end=date_today)
    path = f'training/datasets/{company}.csv'
    df_to_csv.to_csv(path)
    df = pd.read_csv(path)
    
    return df

def convert_type(df):
    df['Close'] = df['Close'].astype(float)
    df['High'] = df['High'].astype(float)
    df['Low'] = df['Low'].astype(float)
    df['Open'] = df['Open'].astype(float)
    df['Volume'] = df['Volume'].astype(int)
    df['Date'] = pd.to_datetime(df['Date'])

def engineer_features(df, window, short_period, long_period, signal_line_period):
    df['Price Change'] = df['Close'].diff().fillna(0)
    
    df['Gain'] = df.loc[df['Price Change'] > 0, 'Price Change']
    df['Loss'] = -df.loc[df['Price Change'] < 0, 'Price Change']
    df['Gain'] = df['Gain'].fillna(0)
    df['Loss'] = df['Loss'].fillna(0)
    
    df['Average Gain'] = df['Gain'].rolling(window=window).mean().fillna(0)
    df['Average Loss'] = df['Loss'].rolling(window=window).mean().fillna(0)
    
    df['RS'] = df['Average Gain'] / df['Average Loss']
    df['RSI'] = 100 - (100 / (1 + df['RS']))
    
    df['Short EMA'] = df['Close'].ewm(span=short_period,adjust=False).mean()
    df['Long EMA'] = df['Close'].ewm(span=long_period, adjust=False).mean()
    
    df['MACD'] = df['Short EMA'] - df['Long EMA']
    df['Signal Line'] = df['MACD'].ewm(span=signal_line_period, adjust=False).mean()
    df['MACD Histogram'] = df['MACD'] - df['Signal Line']
    return df

def drop_features_and_na(df):
    df = df.drop(columns=['Gain', 'Loss'])
    df = df.dropna()
    return df

def print_all_plots(datas, stock, labels):
    for i in range(len(datas)):
        plt.figure(figsize=(10.5,3.5))
        sns.lineplot(data=datas[i], x='Date', y='Close', errorbar=None)
        sns.despine()
        plt.xlabel(xlabel="")
        plt.ylabel(ylabel="")
        plt.savefig(f"../frontend/public/svg_visuals/{stock}_{labels[i]}.svg")
        plt.close()
        
        #Sub chart
        plt.figure(figsize=(10.5,3.5))
        sns.lineplot(data=datas[i], x='Date', y='Close', errorbar=None)
        sns.despine()
        plt.xlabel(xlabel="")
        plt.ylabel(ylabel="")
        plt.savefig(f"../frontend/public/svg_visuals/{stock}_{labels[i]}_m.svg")
        plt.close()
        
        plt.figure(figsize=(16.2,3.5))
        sns.lineplot(data=datas[i], x='Date', y='RSI', errorbar=None)
        sns.despine()
        plt.xlabel(xlabel="")
        plt.ylabel(ylabel="")
        plt.savefig(f"../frontend/public/svg_visuals/{stock}_{labels[i]}_m_RSI.svg")
        plt.close()
        
        fig = px.line(data_frame=datas[i], x='Date', y='Close')
        fig.update_layout(width=1520, 
                          height=660,
                          xaxis_title='', 
                          yaxis_title='',
                          margin=dict(l=0,r=0,t=0,b=0))
        fig.write_html(f"../frontend/public/chart_visuals/{stock}_{labels[i]}.html")

"""
TODO: 
    gains/loss getter, 
    open/close price getter,
    high/low price getter,
    main plot getter,
    overview plot getter,
    rsi plot getter
"""

@app.route('/analyze')
def analyze():
    df_apple, df_microsoft, df_amazon, df_nvidia = load_overall_dataset()
    
    df_apple['Date'] = df_apple['Price']
    df_apple = df_apple.drop(index=[0,1], columns='Price')
    df_microsoft['Date'] = df_microsoft['Price']
    df_microsoft = df_microsoft.drop(index=[0,1], columns='Price')
    df_amazon['Date'] = df_amazon['Price']
    df_amazon = df_amazon.drop(index=[0,1], columns='Price')
    df_nvidia['Date'] = df_nvidia['Price']
    df_nvidia = df_nvidia.drop(index=[0,1], columns='Price')
    
    dfs = [df_apple, df_amazon, df_microsoft, df_nvidia]
    window, short_period, long_period, signal_line_period = set_periodic_variables()
    stocks = ['AAPL', 'AMZN', 'MSFT', 'NVDA']
    labels = ['WW', 'M', 'Y', 'AT']
    
    for i,df in enumerate(dfs):
        convert_type(df)
        df = engineer_features(df, window, short_period, long_period, signal_line_period)
        df = drop_features_and_na(df)
        
        week = df.loc[len(df) - 7::]
        month = df.loc[len(df) - 31::]
        year = df.loc[len(df) - 365::]
        all_time = df
        datas = [week, month, year, all_time]
        
        print_all_plots(datas=datas, stock=stocks[i], labels=labels)
        
@app.route('/stocks/apple')
def apple_analyze():
    df_apple = load_dataset(ticker='AAPL',company='apple')
    df_apple['Date'] = df_apple['Price']
    df_apple = df_apple.drop(index=[0,1], columns='Price')
    
    window, short_period, long_period, signal_line_period = set_periodic_variables()
    convert_type(df_apple)
    df_apple = engineer_features(df_apple, window, short_period, long_period, signal_line_period)
    df_apple = drop_features_and_na(df_apple)
    
    week_start_date = date.today() - timedelta(days=7)
    month_start_date = date.today() - timedelta(days=31)
    year_start_date = date.today() - timedelta(days=365)
    all_start_date = date.today() - timedelta(days=len(df_apple))
    end_date = date.today()
    
    week = df_apple.loc[(df_apple['Date'] <= pd.to_datetime(end_date)) & (df_apple['Date'] > pd.to_datetime(week_start_date))]
    month = df_apple.loc[(df_apple['Date'] <= pd.to_datetime(end_date)) & (df_apple['Date'] > pd.to_datetime(month_start_date))]
    year = df_apple.loc[(df_apple['Date'] <= pd.to_datetime(end_date)) & (df_apple['Date'] > pd.to_datetime(year_start_date))]
    all_time = df_apple.loc[(df_apple['Date'] <= pd.to_datetime(end_date)) & (df_apple['Date'] > pd.to_datetime(all_start_date))]
    
    week_price_change = week.loc[:,'Price Change'].sum()
    month_price_change = month.loc[:,'Price Change'].sum()
    year_price_change = year.loc[:,'Price Change'].sum()
    all_price_change = all_time.loc[:,'Price Change'].sum()
    
    week_price_high = week.loc[:,'High'].max()
    month_price_high = month.loc[:,'High'].max()
    year_price_high = year.loc[:,'High'].max()
    all_price_high = all_time.loc[:,'High'].max()
    
    week_price_low = week.loc[:,'Low'].min()
    month_price_low = month.loc[:,'Low'].min()
    year_price_low = year.loc[:,'Low'].min()
    all_price_low = all_time.loc[:,'Low'].min()
    
    return jsonify({'ticker':'AAPL',
                    'weekly change': round(week_price_change, 2), 
                    'monthly change': round(month_price_change, 2),
                    'yearly change': round(year_price_change, 2),
                    'all change': round(all_price_change, 2),
                    'weekly high': round(week_price_high, 2),
                    'monthly high': round(month_price_high, 2),
                    'yearly high': round(year_price_high, 2),
                    'all high': round(all_price_high, 2),
                    'weekly low': round(week_price_low, 2),
                    'monthly low': round(month_price_low, 2),
                    'yearly low': round(year_price_low, 2),
                    'all low': round(all_price_low, 2)})
    
@app.route('/stocks/amazon')
def amazon_analyze():
    df_amazon = load_dataset(ticker='AMZN',company='amazon')
    df_amazon['Date'] = df_amazon['Price']
    df_amazon = df_amazon.drop(index=[0,1], columns='Price')
    
    window, short_period, long_period, signal_line_period = set_periodic_variables()
    convert_type(df_amazon)
    df_amazon = engineer_features(df_amazon, window, short_period, long_period, signal_line_period)
    df_amazon = drop_features_and_na(df_amazon)
    
    week_start_date = date.today() - timedelta(days=7)
    month_start_date = date.today() - timedelta(days=31)
    year_start_date = date.today() - timedelta(days=365)
    all_start_date = date.today() - timedelta(days=len(df_amazon))
    end_date = date.today()
    
    week = df_amazon.loc[(df_amazon['Date'] <= pd.to_datetime(end_date)) & (df_amazon['Date'] > pd.to_datetime(week_start_date))]
    month = df_amazon.loc[(df_amazon['Date'] <= pd.to_datetime(end_date)) & (df_amazon['Date'] > pd.to_datetime(month_start_date))]
    year = df_amazon.loc[(df_amazon['Date'] <= pd.to_datetime(end_date)) & (df_amazon['Date'] > pd.to_datetime(year_start_date))]
    all_time = df_amazon.loc[(df_amazon['Date'] <= pd.to_datetime(end_date)) & (df_amazon['Date'] > pd.to_datetime(all_start_date))]
    
    week_price_change = week.loc[:,'Price Change'].sum()
    month_price_change = month.loc[:,'Price Change'].sum()
    year_price_change = year.loc[:,'Price Change'].sum()
    all_price_change = all_time.loc[:,'Price Change'].sum()
    
    week_price_high = week.loc[:,'High'].max()
    month_price_high = month.loc[:,'High'].max()
    year_price_high = year.loc[:,'High'].max()
    all_price_high = all_time.loc[:,'High'].max()
    
    week_price_low = week.loc[:,'Low'].min()
    month_price_low = month.loc[:,'Low'].min()
    year_price_low = year.loc[:,'Low'].min()
    all_price_low = all_time.loc[:,'Low'].min()
    
    return jsonify({'ticker':'AMZN',
                    'weekly change': round(week_price_change, 2), 
                    'monthly change': round(month_price_change, 2),
                    'yearly change': round(year_price_change, 2),
                    'all change': round(all_price_change, 2),
                    'weekly high': round(week_price_high, 2),
                    'monthly high': round(month_price_high, 2),
                    'yearly high': round(year_price_high, 2),
                    'all high': round(all_price_high, 2),
                    'weekly low': round(week_price_low, 2),
                    'monthly low': round(month_price_low, 2),
                    'yearly low': round(year_price_low, 2),
                    'all low': round(all_price_low, 2)})
    
@app.route('/stocks/microsoft')
def microsoft_analyze():
    df_microsoft = load_dataset(ticker='MSFT',company='microsoft')
    df_microsoft['Date'] = df_microsoft['Price']
    df_microsoft = df_microsoft.drop(index=[0,1], columns='Price')
    
    window, short_period, long_period, signal_line_period = set_periodic_variables()
    convert_type(df_microsoft)
    df_microsoft = engineer_features(df_microsoft, window, short_period, long_period, signal_line_period)
    df_microsoft = drop_features_and_na(df_microsoft)
    
    week_start_date = date.today() - timedelta(days=7)
    month_start_date = date.today() - timedelta(days=31)
    year_start_date = date.today() - timedelta(days=365)
    all_start_date = date.today() - timedelta(days=len(df_microsoft))
    end_date = date.today()
    
    week = df_microsoft.loc[(df_microsoft['Date'] <= pd.to_datetime(end_date)) & (df_microsoft['Date'] > pd.to_datetime(week_start_date))]
    month = df_microsoft.loc[(df_microsoft['Date'] <= pd.to_datetime(end_date)) & (df_microsoft['Date'] > pd.to_datetime(month_start_date))]
    year = df_microsoft.loc[(df_microsoft['Date'] <= pd.to_datetime(end_date)) & (df_microsoft['Date'] > pd.to_datetime(year_start_date))]
    all_time = df_microsoft.loc[(df_microsoft['Date'] <= pd.to_datetime(end_date)) & (df_microsoft['Date'] > pd.to_datetime(all_start_date))]
    
    week_price_change = week.loc[:,'Price Change'].sum()
    month_price_change = month.loc[:,'Price Change'].sum()
    year_price_change = year.loc[:,'Price Change'].sum()
    all_price_change = all_time.loc[:,'Price Change'].sum()
    
    week_price_high = week.loc[:,'High'].max()
    month_price_high = month.loc[:,'High'].max()
    year_price_high = year.loc[:,'High'].max()
    all_price_high = all_time.loc[:,'High'].max()
    
    week_price_low = week.loc[:,'Low'].min()
    month_price_low = month.loc[:,'Low'].min()
    year_price_low = year.loc[:,'Low'].min()
    all_price_low = all_time.loc[:,'Low'].min()
    
    return jsonify({'ticker':'MSFT',
                    'weekly change': round(week_price_change, 2), 
                    'monthly change': round(month_price_change, 2),
                    'yearly change': round(year_price_change, 2),
                    'all change': round(all_price_change, 2),
                    'weekly high': round(week_price_high, 2),
                    'monthly high': round(month_price_high, 2),
                    'yearly high': round(year_price_high, 2),
                    'all high': round(all_price_high, 2),
                    'weekly low': round(week_price_low, 2),
                    'monthly low': round(month_price_low, 2),
                    'yearly low': round(year_price_low, 2),
                    'all low': round(all_price_low, 2)})

@app.route('/stocks/nvidia')
def nvidia_analyze():
    df_nvidia = load_dataset(ticker='NVDA',company='nvidia')
    df_nvidia['Date'] = df_nvidia['Price']
    df_nvidia = df_nvidia.drop(index=[0,1], columns='Price')
    
    window, short_period, long_period, signal_line_period = set_periodic_variables()
    convert_type(df_nvidia)
    df_nvidia = engineer_features(df_nvidia, window, short_period, long_period, signal_line_period)
    df_nvidia = drop_features_and_na(df_nvidia)
    
    week_start_date = date.today() - timedelta(days=7)
    month_start_date = date.today() - timedelta(days=31)
    year_start_date = date.today() - timedelta(days=365)
    all_start_date = date.today() - timedelta(days=len(df_nvidia))
    end_date = date.today()
    
    week = df_nvidia.loc[(df_nvidia['Date'] <= pd.to_datetime(end_date)) & (df_nvidia['Date'] > pd.to_datetime(week_start_date))]
    month = df_nvidia.loc[(df_nvidia['Date'] <= pd.to_datetime(end_date)) & (df_nvidia['Date'] > pd.to_datetime(month_start_date))]
    year = df_nvidia.loc[(df_nvidia['Date'] <= pd.to_datetime(end_date)) & (df_nvidia['Date'] > pd.to_datetime(year_start_date))]
    all_time = df_nvidia.loc[(df_nvidia['Date'] <= pd.to_datetime(end_date)) & (df_nvidia['Date'] > pd.to_datetime(all_start_date))]
    
    week_price_change = week.loc[:,'Price Change'].sum()
    month_price_change = month.loc[:,'Price Change'].sum()
    year_price_change = year.loc[:,'Price Change'].sum()
    all_price_change = all_time.loc[:,'Price Change'].sum()
    
    week_price_high = week.loc[:,'High'].max()
    month_price_high = month.loc[:,'High'].max()
    year_price_high = year.loc[:,'High'].max()
    all_price_high = all_time.loc[:,'High'].max()
    
    week_price_low = week.loc[:,'Low'].min()
    month_price_low = month.loc[:,'Low'].min()
    year_price_low = year.loc[:,'Low'].min()
    all_price_low = all_time.loc[:,'Low'].min()
    
    return jsonify({'ticker':'NVDA',
                    'weekly change': round(week_price_change, 2), 
                    'monthly change': round(month_price_change, 2),
                    'yearly change': round(year_price_change, 2),
                    'all change': round(all_price_change, 2),
                    'weekly high': round(week_price_high, 2),
                    'monthly high': round(month_price_high, 2),
                    'yearly high': round(year_price_high, 2),
                    'all high': round(all_price_high, 2),
                    'weekly low': round(week_price_low, 2),
                    'monthly low': round(month_price_low, 2),
                    'yearly low': round(year_price_low, 2),
                    'all low': round(all_price_low, 2)})

@app.route('/predict/apple', method=['POST'])
def apple_predict():
    data = request.json()
    apple_input = data.get('predict','')
    prediction = apple.predict([apple_input])
    
    return jsonify({'Prediction': str(prediction[0])})

@app.route('/predict/amazon', method=['POST'])
def amazon_predict():
    data = request.json()
    amazon_input = data.get('predict','')
    prediction = amazon.predict([amazon_input])
    
    return jsonify({'Prediction': str(prediction[0])})
    
@app.route('/predict/microsoft', method=['POST'])
def microsoft_predict():
    data = request.json()
    microsoft_input = data.get('predict','')
    prediction = microsoft.predict([microsoft_input])
    
    return jsonify({'Prediction': str(prediction[0])})
    
@app.route('/predict/nvidia', method=['POST'])
def nvidia_predict():
    data = request.json()
    nvidia_input = data.get('predict','')
    prediction = nvidia.predict([nvidia_input])
    
    return jsonify({'Prediction': str(prediction[0])})

"""
FUNCTIONS:
func:load_dataset()
func:convert_type()
func:engineer_features()
func:drop_features_and_na()
func:print_all_plots()

route:analyze()
route:apple_analyze()
route:amazon_analyze()
route:microsoft_analyze()
route:nvidia_analyze()

route:apple_predict()
route:amazon_predict()
route:microsoft_predict()
route:nvidia_predict()
"""

if __name__ == '__main__':
    app.run(debug=True)


