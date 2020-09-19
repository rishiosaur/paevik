const moment = require('moment')

const momentFormat = 'YYYY-MM-DD'
const slackFormat = '{date_short_pretty} at {time}'

const isoTime = () => moment.format(momentFormat)
const currentUnix = () => moment.unix()

export const currentDate = () =>
    `<!date^${currentUnix()}^${slackFormat}|${isoTime()}>`
