import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallbackTitle?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary:', error)
    console.error('Error Info:', errorInfo)
    console.log('Error Boundary caught an error!')
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
  return (
    <div className="flex h-full min-h-75 flex-col rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 font-semibold text-slate-900">
        {this.props.fallbackTitle ?? 'Oops! Terjadi Kesalahan'}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AlertTriangle size={32} className="text-red-500" />

        <p className="mt-3 font-semibold text-slate-800">
          Komponen gagal dimuat
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Silakan coba kembali.
        </p>

        <button
          type="button"
          onClick={this.handleReset}
          className="mt-4 flex items-center gap-2 rounded-xl bg-[#6553E8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5543D8]"
        >
          <RefreshCw size={16} />
          Coba Lagi
        </button>
      </div>
    </div>
  )
}

    return this.props.children
  }
}

export default ErrorBoundary
