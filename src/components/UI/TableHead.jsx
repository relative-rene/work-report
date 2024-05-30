
const TableHead = ({ data, keys, selectHead }) => {
    const categories = data && <tr>{Object.keys(data).map((val, i) => {
        if (keys[val]) {
            return <th onClick={()=>selectHead(keys[val])} key={`${val}${-i}`}>{keys[val] || ''}</th>
        }
        return false;
    })}</tr>;
    return (
        <thead className="TableHead">
            {categories || '...Loading'}
        </thead>
    );
}

export default TableHead;