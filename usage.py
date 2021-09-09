import dash_react_bubble_chart
import dash
from dash.dependencies import Input, Output,State
import dash_html_components as html
import dash_core_components as dcc
from dash.exceptions import PreventUpdate
import pandas as pd


app = dash.Dash(__name__)

df = pd.read_csv("C:/Users/aboyh/Downloads/scopus.csv")
data = df['Authors'].str.split(",").explode().value_counts().rename_axis("label").reset_index(name="value").to_dict('records')

app.layout = html.Div([
    dcc.Input(id='data-input', debounce=True),
    dcc.Slider(
        id='padding-slider',
        min=0,
        max=100,
        step=1,
        value=0
    ),
    dash_react_bubble_chart.BubbleChart(
        id='bubble-chart',
        data=data,
        # height=500,
        # width=1000,
        overflow=False
    ),
])

@app.callback(
    Output('bubble-chart','data'),
    Output('data-input','value'),
    Input('data-input','value'),
    State('bubble-chart','data')
)
def add_data(value, data):
    if value is None:
        raise PreventUpdate
    value = value.split(":")
    if len(value) != 2:
        raise PreventUpdate
    try:
        label = value[0]
        val = float(value[1])
    except:
        raise PreventUpdate
    if data is None:
        data = []
    data.append({"label":label, "value":val})
    return data, ""


@app.callback(
    Output('bubble-chart','padding'),
    Input('padding-slider','value')
)
def padding_update(value):
    return value
    

if __name__ == '__main__':
    app.run_server(debug=True)
