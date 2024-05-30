import { lazy, useState, useMemo } from 'react';
import { useData } from '../hooks/useData';
import { SETS_KEY_LABELS } from '../data/constants';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import AddSet from '../components/AddSet';

const Table = lazy(() => import('../components/UI/Table'));

function SetsPage() {
    const { exercises, sets } = useData();
    const [query, setQuery] = useState('');

    const filteredItems = useMemo(() => {
        if (sets.length === 0) return;
        return sets.filter(({ exercise_name, date_and_time }) => {
            return exercise_name.toLowerCase().includes(query.toLowerCase()) || date_and_time.toLowerCase().includes(query.toLowerCase());
        });
    }, [sets, query]);

    const sortInit = Object.keys(SETS_KEY_LABELS).reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
    }, {});

    return (
        <>
            <section className="section-peak">
                <h1 className="wr-title">Sets Hub</h1>
                <div className="wr-search-table">
                    <label className="wr-label">Search
                        <input
                            placeholder="exercise or date"
                            className="wr-input"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            type="search" />
                    </label>
                </div>
                <div className="table-container">
                    {filteredItems ? <Table tName="SetsTable" editPath="/hub/sets/edit/" initSortHash={sortInit}tableData={filteredItems} sortBy="date_and_time" keys={SETS_KEY_LABELS} /> :
                         <LoadingSpinner />
                    }
                </div> <br />
            </section>
            <AddSet exercises={exercises} />
        </>
    );
}

export default SetsPage;