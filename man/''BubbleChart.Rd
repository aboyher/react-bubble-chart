% Auto-generated: do not edit by hand
\name{''BubbleChart}

\alias{''BubbleChart}

\title{BubbleChart component}

\description{
ExampleComponent is an example component. It takes a property, `label`, and displays it. It renders an input with the property `value` which is editable by the user.
}

\usage{
''BubbleChart(id=NULL, data=NULL, height=NULL, labelFont=NULL,
overflow=NULL, padding=NULL, selectedNode=NULL,
showLegend=NULL, valueFont=NULL, width=NULL)
}

\arguments{
\item{id}{Character. }

\item{data}{List of lists containing elements 'label', 'value'.
those elements have the following types:
  - label (character; required)
  - value (numeric; required)s. The ID used to identify this component in Dash callbacks.}

\item{height}{Numeric. }

\item{labelFont}{Lists containing elements 'family', 'size', 'color', 'weight'.
those elements have the following types:
  - family (character; optional)
  - size (numeric; optional)
  - color (character; optional)
  - weight (character; optional). }

\item{overflow}{Logical. }

\item{padding}{Numeric. }

\item{selectedNode}{Character. }

\item{showLegend}{Logical. }

\item{valueFont}{Lists containing elements 'family', 'size', 'color', 'weight'.
those elements have the following types:
  - family (character; optional)
  - size (numeric; optional)
  - color (character; optional)
  - weight (character; optional). }

\item{width}{Numeric. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

