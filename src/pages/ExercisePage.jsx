import { lazy, useState, useMemo } from 'react';
import AddExercise from '../components/AddExercise';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { EXERCISE_KEY_LABELS } from '../data/constants';
import { useData } from '../hooks/useData';

const Table = lazy(() => import('../components/UI/Table'));

const ExercisePage = () => {
    let { exercises } = useData();
    const [query, setQuery] = useState('');

    const filteredItems = useMemo(() => {
        if (exercises.length === 0) return;
        return exercises.filter(({ name, muscle_group, primary_muscle, balance }) => {
            return balance.toLowerCase().includes(query.toLowerCase()) || name.toLowerCase().includes(query.toLowerCase()) || muscle_group.toLowerCase().includes(query.toLowerCase()) || primary_muscle.toLowerCase().includes(query.toLowerCase());
        });
    }, [exercises, query]);

    const initSort = Object.keys(EXERCISE_KEY_LABELS).reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
    }, {});

    return (
        <>
            <section className="section-peak">
                <h1 className="wr-title">Exercise Hub</h1>
                <div className="wr-search-table">
                    <label className="wr-label">Search
                        <input
                            className="wr-input"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            type="search" />
                    </label>
                </div>
                <div className="table-container">
                    {filteredItems ?
                        <Table tName="ExerciseTable" editPath="/hub/exercises/edit/" tableData={filteredItems} initSortHash={initSort} keys={EXERCISE_KEY_LABELS} /> :
                        <LoadingSpinner />
                    }
                </div><br />
            </section>
            <AddExercise />
        </>
    );
}

export default ExercisePage;