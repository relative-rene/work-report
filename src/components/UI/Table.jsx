
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ tableData, sortBy, editPath}) => {
    const sortedData = tableData.sort((a, b) => a[sortBy] - b[sortBy]);

    return (
        <table className="Table">
            <TableHead data={sortedData[0] || []} />
            <TableBody editPath={editPath} data={sortedData || []} />
        </table>
    )
}

export default Table;