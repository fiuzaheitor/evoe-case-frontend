import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning', id?: any, position?: any) => {
  const theme = 'light'

  if (toast.isActive(id)) {
    return
  }
  if (type === 'success') {
    toast.success(message, { theme: theme, position: position || 'top-right', toastId: id })
  }
  if (type === 'error') {
    toast.error(message, { theme: theme, position: position || 'top-right', toastId: id })
  }
  if (type === 'info') {
    toast.info(message, { theme: theme, position: position || 'top-right', toastId: id })
  }
  if (type === 'warning') {
    toast.warning(message, { theme: theme, position: position || 'top-right', toastId: id })
  }
}

export const updateToast = (id: string, message: string, type: any) => {
  const theme = 'light'

  toast.update(id, {
    render: message,
    type,
    theme: theme,
    isLoading: false,
    autoClose: 3000,
  })
}
