import { Component } from 'react'

export default class SceneErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    this.props.onError?.(error)
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}
