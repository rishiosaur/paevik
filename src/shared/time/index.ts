const moment = require('moment')

const momentFormat = 'YYYY-MM-DD'
const slackFormat = '{date_short_pretty} at {time}'

export const isoTime = () => moment.format(momentFormat)

export const currentDate = () => `<!date^${currentUnix}^${slackFormat}|${isoTime}>`
