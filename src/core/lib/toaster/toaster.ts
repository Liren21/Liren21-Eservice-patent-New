

import 'toasted-notes/src/styles.css'
import 'animate.css'
import { cssTransition, toast, ToastId, TypeOptions } from 'react-toastify'
import './toaster.scss'

/**
 * Toaster
 * Pool up messenger of app.
 * Dont set this file!!!
 */
const fade = cssTransition({
    enter: 'animate__fadeInDown',
    exit: 'animate__fadeOutUp',
})

const msgs = []

interface IToaster {
    toastId?: ToastId
    msg: string
    type: TypeOptions
    isNotShow?: boolean
}

class Toaster implements IToaster {
    msg = ''
    toastId = null
    isNotShow = false
    type: TypeOptions = toast.TYPE.INFO

    constructor(obj: IToaster) {
        this.msg = obj.msg
        this.type = obj.type

        !obj.isNotShow && this.notify(obj.msg, obj.type)
    }

    notify(msg: string = this.msg, type: TypeOptions = this.type): void {
        this.toastId = toast(msg, { type: type, autoClose: 10000, transition: fade })

        if (msgs.length > 2) {
            msgs.forEach((id) => {
                toast.dismiss(id)
            })

            msgs.splice(0, msgs.length)
        }

        msgs.push(this.toastId)
    }

    update(msg = this.msg, type = this.type): void {
        toast.update(this.toastId, { render: msg, type: type, autoClose: 10000, transition: fade })
    }

    dismiss(): void {
        toast.dismiss(this.toastId)
    }
}

export default Toaster
