import { useNavigate } from 'react-router-dom';

const TableBody = ({ data, editPath, keys }) => {
    const navigate = useNavigate();
    const editEntry = (path) => {
        navigate(path);
    }
    const display = data && data.map((entry) => {
        return (<tr key={entry._id} onClick={() => editEntry(editPath + entry._id)}>{Object.entries(entry).map(([key,val], i) => {
            if (keys.hasOwnProperty(key)) {
                return <td key={`${val}${-i}`}>{val|| '-'}</td>
            }
            return false;
        })}</tr>);
    });
    return (
        <tbody className="TableBody">
            {display}
        </tbody>
    )
}

export default TableBody;