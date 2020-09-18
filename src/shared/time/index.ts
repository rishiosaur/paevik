const moment = require("moment")

const formatting = "MMMM DD YYYY"

export const getTime = () => moment().format(formatting)