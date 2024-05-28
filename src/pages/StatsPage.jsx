import { lazy, useState, useMemo } from 'react';
import { useData } from '../hooks/useData';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import AddStats from '../components/AddStats';
import { STATS_KEY_LABELS } from '../data/constants';
const Table = lazy(() => import('../components/UI/Table'));

const StatsPage = () => {
    const { stats } = useData();
    const [query, statsQuery] = useState('');

    const filteredItems = useMemo(() => {
        if (stats.length === 0) return;
        return stats.filter(({ date }) => {
            return date.toLowerCase().includes(query.toLowerCase());
        });
    }, [stats, query]);


    return (
        <>
            <section className="section-peak">
                <h1 className="wr-title">Stats Hub</h1>
                <div className="wr-search-table">
                    <label className="wr-label">Search
                        <input
                            placeholder="filter by months"
                            className="wr-input"
                            value={query}
                            onChange={e => statsQuery(e.target.value)}
                            type="search" />
                    </label>
                </div>
                <div className="table-container">
                    {filteredItems ? <Table tName="StatsTable" editPath="/hub/stats/edit/" tableData={filteredItems} keys={STATS_KEY_LABELS} sortBy="date" /> : <LoadingSpinner />}
                </div><br />
            </section>

            <AddStats />
        </>
    );
}
export default StatsPage;