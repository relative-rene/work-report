
import { useNavigate } from 'react-router-dom';


const TableBody = ({ data, editPath }) => {
    const navigate = useNavigate();
    const editEntry = (path) => {
        navigate(path);
    }
    const display = data && data.map((entry) => {
        return (<tr onClick={()=>editEntry(editPath+entry._id)}> {Object.values(entry).map((val, i) => <td key={`${val}${-i}`}>{val || ''}</td>)} </tr>)
    });
    return (
        <tbody className="TableBody">
            {display}
        </tbody>
    )
}

export default TableBody;