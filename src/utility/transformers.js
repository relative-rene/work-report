export const groupByKey = (arr, key) =>
    arr.reduce((acc, curr) => {
        const group = curr[key];
        acc[group] = acc[group] || [];
        acc[group].push(curr);
        return acc;
    }, {});

export const pieChartConfig = (muscle_group_label, backgroundColor, borderColor, pieDataLabel, pieData) => {
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

export function formatTimeStampToUS(timestamp) {
    const date = new Date(timestamp);
    date.setDate(date.getDate() + 1);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
}

export function formatUSDateToIsoString(localDate) {
    return localDate !== 'Invalid Date' ? new Date(localDate).toISOString().substring(0, 10) : 'Invalid Date';

}
