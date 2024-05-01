export const groupByKey = (arr, key) =>
    arr.reduce((acc, curr) => {
        const group = curr[key];
        acc[group] = acc[group] || [];
        acc[group].push(curr);
        return acc;
    }, {});