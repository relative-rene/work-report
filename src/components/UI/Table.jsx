import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ tableData, sortBy }) => {
    const sortedData = tableData.sort((a, b) => a[sortBy] - b[sortBy]);

    return (
        <table className="Table">
            <TableHead data={sortedData[0] || []} />
            <TableBody data={sortedData || []} />
        </table>
    )
}

export default Table;