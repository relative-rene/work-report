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