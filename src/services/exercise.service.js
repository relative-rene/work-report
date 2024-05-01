export async function getExerciseData() {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises`);
    const data = await response.json();
    return data;
}