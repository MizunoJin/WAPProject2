import React from "react";

export default function Catch(component, errorHandler) {
  return class extends React.Component {
    state = {
      error: undefined,
    };

    static getDerivedStateFromError(error) {
      return { error };
    }

    componentDidCatch(error, info) {
      if (errorHandler) {
        errorHandler(error, info);
      }
    }

    render() {
      return component(this.props, this.state.error);
    }
  };
}
