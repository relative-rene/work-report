import React, { use } from 'react';
import AddStats from '../components/AddStats';
import { useAuth } from '../hooks/useAuth';

const StatsPage = () => {
    const { user } = useAuth();
    let data = 'Default Data';

    if (!!user) {
        data = fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user._id}/read_stats`).then(res => res.json());
        console.log('data', data);
        
    }
    return (
        <>
            <AddStats />
        </>
    );
}
export default StatsPage;