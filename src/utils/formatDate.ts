import 'dayjs/locale/es'
import dayjs from 'dayjs'

dayjs.locale('es')

export const formatDate = (date: Date | string) => {
  return dayjs(date).locale('es').format('DD/MM/YYYY')
}
