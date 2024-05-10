
const TableHead = ({ data }) => {
    const categories = data && <tr>{Object.keys(data).map((val,i) => <th key={`${val}${-i}`}>{val || ''}</th>)} </tr>;
    return (
        <thead className="TableHead">
            {categories || ''}
        </thead>
    );
}

export default TableHead;