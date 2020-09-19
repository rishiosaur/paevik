const moment = require('moment')

export const formatting = 'YYYY-MM-DD'

export const currentDate = () => moment().format(formatting)
