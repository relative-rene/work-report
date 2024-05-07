import React from 'react';



const TableHead = ({ data }) => {
    const categories = data && <tr>{Object.keys(data).map(val => <th key={`${val}${data._id.substring(0, 12)}`}>{val}</th>)} </tr>;
    return (
        <thead className="TableHead">
            {categories || ''}
        </thead>
    );
}

export default TableHead;