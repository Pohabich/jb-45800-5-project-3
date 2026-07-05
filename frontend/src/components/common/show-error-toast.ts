import toast from 'react-hot-toast'


export function showErrorToast(msg: string): void {
    toast.error(msg)
}