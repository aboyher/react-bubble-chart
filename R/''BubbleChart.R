# AUTO GENERATED FILE - DO NOT EDIT

''BubbleChart <- function(id=NULL, data=NULL, height=NULL, labelFont=NULL, overflow=NULL, padding=NULL, showLegend=NULL, valueFont=NULL, width=NULL) {
    
    props <- list(id=id, data=data, height=height, labelFont=labelFont, overflow=overflow, padding=padding, showLegend=showLegend, valueFont=valueFont, width=width)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'BubbleChart',
        namespace = 'dash_react_bubble_chart',
        propNames = c('id', 'data', 'height', 'labelFont', 'overflow', 'padding', 'showLegend', 'valueFont', 'width'),
        package = 'dashReactBubbleChart'
        )

    structure(component, class = c('dash_component', 'list'))
}
