import dash_react_bubble_chart
import dash
from dash.dependencies import Input, Output, State
from dash import dcc, html
from dash.exceptions import PreventUpdate
import dash_bootstrap_components as dbc
import pandas as pd


app = dash.Dash(__name__)

df = pd.read_csv("C:/Users/aboyh/Downloads/scopus.csv")
data = df['Authors'].str.split(",").explode().value_counts().head(
    10).rename_axis("label").reset_index(name="value").to_dict('records')


app.layout = dbc.Container(
    fluid=True,
    children=[
        dbc.Row(
            [
                dbc.Col(
                    [
                        dbc.Row(
                            dbc.Col(
                                dash_react_bubble_chart.BubbleChart(
                                    id='bubble-chart',
                                    data=data,
                                    # height=500,
                                    # width=1000,
                                ),
                            )
                        ),
                        dbc.Row(
                            dbc.Col(
                                width=12
                            )
                        )
                    ],
                ),
                dbc.Col(
                    [
                        dbc.Row(
                            [
                                dbc.Col(
                                    [
                                        dcc.Input(
                                            value='', id='data-input', debounce=True),
                                        dcc.Slider(
                                            id='padding-slider',
                                            min=0,
                                            max=1000,
                                            step=1,
                                            value=3
                                        ),
                                        html.H1(id="output"),
                                    ]
                                )
                            ]
                        )
                    ]
                )
            ]
        )
    ]
)



@app.callback(
    Output('bubble-chart', 'data'),
    Output('data-input', 'value'),
    Input('data-input', 'value'),
    State('bubble-chart', 'data')
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
    data.append({"label": label, "value": val})
    # print(data)
    return data, ""


@app.callback(
    Output('bubble-chart', 'padding'),
    Input('padding-slider', 'value')
)
def padding_update(value):
    return value


@app.callback(
    Output('output', 'children'),
    Input('bubble-chart', 'selectedNode')
)
def fn(node):
    # print(node)
    return node


if __name__ == '__main__':
    app.run_server(debug=True)
