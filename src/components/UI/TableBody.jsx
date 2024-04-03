import React from 'react';



const TableBody = ({ data }) => {
const display = data.map((item) => {
    const { body_fat_percent, weight,_id } = item;
    return <tr key={_id}>
        <td>{weight}</td>
        <td>{body_fat_percent}</td>
    </tr>
})
    return (
        <tbody>
            {display}
        </tbody>
    )
}

export default TableBody;