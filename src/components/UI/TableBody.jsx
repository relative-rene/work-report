import React from 'react';



const TableBody = ({ data }) => {
    const display = data && data.map((entry) => {
        return( <tr> {Object.values(entry).map(val => <td key={`${val}${entry._id.substring(0, 12)}`}>{val}</td>) } </tr>);
        });
    return (
        <tbody className="TableBody">
            {display}
        </tbody>
    )
}

export default TableBody;