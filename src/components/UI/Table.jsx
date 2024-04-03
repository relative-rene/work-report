import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ tableData, sortBy }) => {
    const sortedData = tableData.sort((a, b) => a[sortBy] - b[sortBy]);

    return (
        <table>
            <TableHead data={sortedData} />
            <TableBody data={sortedData} />
        </table>
    )
}

export default Table;