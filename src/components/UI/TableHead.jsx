import React from 'react';



const TableHead = ({data}) => {
    // const category = data.map(val=> <tr><th>{val}</th></tr>);
    return (
        <thead>
           <tr><th>Category</th><th>Values</th></tr>
        </thead>
    );
}

export default TableHead;