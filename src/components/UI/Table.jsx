import { useEffect, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ tableData, sortBy, editPath, keys, tName, initSortHash }) => {

    const [sortHash, setSortHash] = useState(initSortHash);
    const [sortedData, setSortedData] = useState([])

    const handleSelectedHead = (val) => {
        let selected = Object.entries(keys).find(([key, value]) => {
            if (value === val) {
                return key
            }
        });
        onSortBy(selected[0], sortHash[selected[0]]);
    }

    const onSortBy = (filterHeader, upOrDown) => {
        setSortHash({ ...sortHash, [filterHeader]: !sortHash[filterHeader] });
        if (filterHeader && filterHeader.includes('date')) {
            if (upOrDown) {
                setSortedData(tableData.sort((a, b) => new Date(a[filterHeader]) - new Date(b[filterHeader])));
            } else {
                setSortedData(tableData.sort((a, b) => new Date(b[filterHeader]) - new Date(a[filterHeader])));            }
        } else {
            if (upOrDown) {
                setSortedData(tableData.sort((a, b) => a[filterHeader] < b[filterHeader] ? -1 : 1));
            } else {
                setSortedData(tableData.sort((a, b) => a[filterHeader] > b[filterHeader] ? -1 : 1));
            }
        }
    }

    useEffect(()=>{
        onSortBy(sortBy, sortHash[sortBy])
    },[tableData])
    return (
        <table className={`Table ${tName}`}>
            <TableHead selectHead={handleSelectedHead} data={sortedData ? sortedData[0] : []} keys={keys} />
            <TableBody editPath={editPath} data={sortedData || []} keys={keys} />
        </table>
    );
}

export default Table;