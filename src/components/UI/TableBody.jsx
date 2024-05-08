import React from 'react';



const TableBody = ({ data }) => {
    const display = data && data.map((entry) => {
        return( <tr> {Object.values(entry).map((val,i) => <td key={`${val}${-i}`}>{val}</td>) } </tr>);
        });
    return (
        <tbody className="TableBody">
            {display}
        </tbody>
    )
}

export default TableBody;