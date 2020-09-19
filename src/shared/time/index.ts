const moment = require("moment")

export const formatting = "YYYY-MM-DD"

export const getTime = () => moment().format(formatting)