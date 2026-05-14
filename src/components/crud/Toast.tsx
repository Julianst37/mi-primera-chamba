import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    onClose?: () => void;
}

const getToastStyles = (type: ToastType) => {
    const baseStyles = {
        position: 'fixed' as const,
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '4px',
        color: 'white',
        fontSize: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 9999,
        animation: 'slideIn 0.3s ease-in-out',
        maxWidth: '400px'
    };

    const typeStyles = {
        success: {
            ...baseStyles,
            backgroundColor: '#4CAF50'
        },
        error: {
            ...baseStyles,
            backgroundColor: '#f44336'
        },
        info: {
            ...baseStyles,
            backgroundColor: '#2196F3'
        }
    };

    return typeStyles[type];
};

const getIconEmoji = (type: ToastType) => {
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    return icons[type];
};

export const Toast = ({ message, type, duration = 3000, onClose }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <>
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `}</style>
            <div style={getToastStyles(type)}>
                <span style={{ fontSize: '1.25rem' }}>{getIconEmoji(type)}</span>
                <span>{message}</span>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '1.25rem',
                        padding: '0',
                        marginLeft: 'auto'
                    }}
                >
                    ✕
                </button>
            </div>
        </>
    );
};

// Hook para manejar múltiples toasts
export const useToast = () => {
    const [toasts, setToasts] = useState<Array<{
        id: string;
        message: string;
        type: ToastType;
        duration?: number;
    }>>([]);

    const addToast = (message: string, type: ToastType = 'info', duration = 3000) => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (message: string, duration?: number) => addToast(message, 'success', duration);
    const error = (message: string, duration?: number) => addToast(message, 'error', duration);
    const info = (message: string, duration?: number) => addToast(message, 'info', duration);

    return { toasts, removeToast, success, error, info };
};

interface ToastContainerProps {
    toasts: Array<{
        id: string;
        message: string;
        type: ToastType;
        duration?: number;
    }>;
    removeToast: (id: string) => void;
}

export const ToastContainer = ({ toasts, removeToast }: ToastContainerProps) => {
    return (
        <>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </>
    );
};
