
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ tableData, sortBy, editPath, keys }) => {
    let sortedData;
    if (sortBy && sortBy.includes('date')){
        sortedData = tableData.sort((a, b) => new Date(a[sortBy]) - new Date(b[sortBy]));
    } else {
        sortedData = tableData.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1);
    }
    return (
        <table className="Table">
            <TableHead data={sortedData[0] || []} keys={keys} />
            <TableBody editPath={editPath} data={sortedData || []} keys={keys} />
        </table>
    )
}

export default Table;