import React from "react"
import Catch from "./functional-error-boundary"
import Error from "./components/pages/Error/Error"

export const ErrorBoundary = Catch(function MyErrorBoundary(props, error) {
  if (error) {
    return (
      <Error></Error>
    )
  } else {
    return <React.Fragment>{props.children}</React.Fragment>
  }
})
