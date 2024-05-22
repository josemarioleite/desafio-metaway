import swal from 'sweetalert2'
import '../styles/swalAlert.css'

export function SwalAlert (text: string, title: string = 'Atenção') {
  return swal.fire({ title, text })
}

export function SwalConfirm (text: string, title: string = 'Atenção') {
  return swal.fire({
    text,
    title,
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Cancelar',
    customClass: {
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2'
    },
  })
}

export function formatDate(inputDate: string, international: boolean = false): string {
  if (international) {
    const [day, month, year] = inputDate.split('/')

    return `${year}-${month}-${day}`
  }

  const [year, month, day] = inputDate.split('-')

  return `${day}/${month}/${year}`
}

export function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  return emailRegex.test(email)
}