
const TableHead = ({ data, keys }) => {
    const categories = data && <tr>{Object.keys(data).map((val, i) => {
        if (keys[val]) {
            return <th key={`${val}${-i}`}>{keys[val] || ''}</th>
        }
        return false;
    })}</tr>;
    return (
        <thead className="TableHead">
            {categories || ''}
        </thead>
    );
}

export default TableHead;