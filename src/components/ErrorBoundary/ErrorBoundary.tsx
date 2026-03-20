import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoudary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false,
            error: undefined
        }
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }
            return (
                <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    border: '2px solid red',
                    borderRadius: '8px',
                    margin: '20px',
                    backgroundColor: '#fff2d7'
                }}>
                    <h2>⚠️ Что-то пошло не так</h2>
                    <p>{this.state.error?.message || 'Неизвестная ошибка'}</p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: undefined })}
                        style={{
                            padding: '10px 20px',
                            background: '#c0a080',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Попробовать снова
                    </button>
                </div>
            )
        }   
        return this.props.children
    }
}

export default ErrorBoudary