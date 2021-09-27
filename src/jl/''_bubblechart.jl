# AUTO GENERATED FILE - DO NOT EDIT

export ''_bubblechart

"""
    ''_bubblechart(;kwargs...)

A BubbleChart component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional)
- `data` (optional): The ID used to identify this component in Dash callbacks.. data has the following type: Array of lists containing elements 'label', 'value'.
Those elements have the following types:
  - `label` (String; required)
  - `value` (Real; required)s
- `height` (Real; optional)
- `labelFont` (optional): . labelFont has the following type: lists containing elements 'family', 'size', 'color', 'weight'.
Those elements have the following types:
  - `family` (String; optional)
  - `size` (Real; optional)
  - `color` (String; optional)
  - `weight` (String; optional)
- `overflow` (Bool; optional)
- `padding` (Real; optional)
- `selectedNode` (String; optional)
- `showLegend` (Bool; optional)
- `valueFont` (optional): . valueFont has the following type: lists containing elements 'family', 'size', 'color', 'weight'.
Those elements have the following types:
  - `family` (String; optional)
  - `size` (Real; optional)
  - `color` (String; optional)
  - `weight` (String; optional)
- `width` (Real; optional)
"""
function ''_bubblechart(; kwargs...)
        available_props = Symbol[:id, :data, :height, :labelFont, :overflow, :padding, :selectedNode, :showLegend, :valueFont, :width]
        wild_props = Symbol[]
        return Component("''_bubblechart", "BubbleChart", "dash_react_bubble_chart", available_props, wild_props; kwargs...)
end

