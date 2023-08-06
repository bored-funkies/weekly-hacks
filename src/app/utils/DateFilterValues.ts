import moment from "moment";

const DateFilterValues = {
    LastWeek: {
        Start: moment().startOf('week').subtract(7,'days').local().format('YYYY-MM-DDTHH:mm:ss'),
        End: moment().endOf('week').subtract(7, 'days').local().format('YYYY-MM-DDTHH:mm:ss')
    },
    ThisWeek: {
        Start: moment().startOf('week').local().format('YYYY-MM-DDTHH:mm:ss'),
        End: moment().endOf('week').local().format('YYYY-MM-DDTHH:mm:ss')
    },
    LastMonth: {
        Start: moment().startOf('month').subtract(1,'months').local().format('YYYY-MM-DDTHH:mm:ss'),
        End: moment().endOf('month').subtract(1,'months').local().format('YYYY-MM-DDTHH:mm:ss')
    }
}

export default DateFilterValues;