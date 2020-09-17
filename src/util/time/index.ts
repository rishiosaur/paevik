import moment from "moment";

const formatting = "MMMM Do YYYY";

export const getTime = () => moment().format(formatting);
