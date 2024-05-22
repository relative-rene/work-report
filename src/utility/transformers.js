export const groupByKey = (arr, key) =>
    arr.reduce((acc, curr) => {
        const group = curr[key];
        acc[group] = acc[group] || [];
        acc[group].push(curr);
        return acc;
    }, {});

export const buildChartData = (muscle_group_label, backgroundColor, borderColor, pieDataLabel, pieData) => {
    return {
        labels: muscle_group_label,
        datasets: [
            {
                label: pieDataLabel,
                data: pieData,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    };
}

export const capitalizeStr = (str) => {
    return str[0].toUpperCase() + str.substring(1)
}

export const lowerCaseSnakeCaseStr = (str) => {
    return str.toLowerCase().replaceAll(' ', '_');
}

export const formatTimeStampToUS = (timestamp) => {
    let date = offSetUTC(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}

export const offSetUTC = (timestamp) => {
    let date = new Date(timestamp);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
}

export const formatUSDateToIsoString = (localDate) => {
    return localDate !== 'Invalid Date' ? new Date(localDate).toISOString().substring(0, 10) : 'Invalid Date';

}

export const addWorkLoad = (curr) => {
    let { total_reps, right_reps, left_reps, set_weight } = curr;
    total_reps = total_reps || 0;
    right_reps = right_reps || 0;
    left_reps = left_reps || 0;
    set_weight = set_weight || 0;
    return set_weight * (right_reps + left_reps + total_reps);
}

export const filterByMonths = (monthsBack, list) => {
    const monthRange = new Date();
    monthRange.setMonth(monthRange.getMonth() - monthsBack);
    return list.filter(({date_and_time}) => new Date(date_and_time) >= monthRange);
}