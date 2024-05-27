import swal from 'sweetalert2'
import '../styles/swalAlert.css'

export function generateLightColor () {
  const minColor = 180

  const red = Math.floor(Math.random() * (255 - minColor + 1)) + minColor
  const green = Math.floor(Math.random() * (255 - minColor + 1)) + minColor
  const blue = Math.floor(Math.random() * (255 - minColor + 1)) + minColor

  return `rgb(${red}, ${green}, ${blue})`
}

export function generateColdColor () {
  const minBlue = 180

  const red = Math.floor(Math.random() * 100)
  const green = Math.floor(Math.random() * 150)
  const blue = Math.floor(Math.random() * (255 - minBlue + 1)) + minBlue

  return `rgb(${red}, ${green}, ${blue})`
}

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

interface Item {
  id: number
  [key: string]: any
}

export function sortByIdDesc(items: Item[]) {
  return items.sort((a, b) => b.id - a.id)
}