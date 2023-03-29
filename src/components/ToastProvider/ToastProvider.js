import React from 'react'
import useKeydown from '../../hooks/use-keydown'

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([])
	const messageRef = React.useRef()

	const handleEscape = React.useCallback(() => {
		setToasts([])
	}, [])

	useKeydown('Escape', handleEscape)

	function createToast(message, variant) {
		const nextToasts = [
			...toasts,
			{
				variant,
				message,
				id: crypto.randomUUID(),
			},
		]
		setToasts(nextToasts)
	}

	function handleDismiss(id) {
		const nextToasts = toasts.filter((toast) => {
			return toast.id !== id
		})
		setToasts(nextToasts)
		messageRef.current.focus()
	}

	return (
		<ToastContext.Provider
			value={{ toasts, createToast, handleDismiss, messageRef }}
		>
			{children}
		</ToastContext.Provider>
	)
}

export default ToastProvider
