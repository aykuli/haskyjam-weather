/* eslint-disable react/state-in-constructor */
import React, { Component, ReactNode } from 'react';

import ErrorIndicator from './error-indicator';

interface Props {
  children: ReactNode;
}
interface ErrorState {
  isWasError: boolean;
}

class ErrorBoundry extends Component<Props> {
  state: ErrorState = {
    isWasError: false,
  };

  componentDidCatch() {
    this.setState({ isWasError: true });
  }

  render() {
    const { isWasError } = this.state;
    const { children } = this.props;
    return isWasError ? <ErrorIndicator /> : children;
  }
}

export default ErrorBoundry;
