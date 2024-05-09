import React from 'react';
import { useNavigate } from 'react-router-dom';


const TableBody = ({ data }) => {
    const navigate = useNavigate();
    const editEntry = (path) => {
        console.log('path', path)
        navigate(path);
    }
    const display = data && data.map((entry) => {
        return (<tr onClick={()=>editEntry(entry._id)}> {Object.values(entry).map((val, i) => <td key={`${val}${-i}`}>{val}</td>)} </tr>)
    });
    return (
        <tbody className="TableBody">
            {display}
        </tbody>
    )
}

export default TableBody;