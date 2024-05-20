import swal from 'sweetalert2'

export function SwalAlert (text: string, title: string = 'Atenção') {
  return swal.fire({ title, text })
}
