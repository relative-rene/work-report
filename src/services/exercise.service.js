export async function getExerciseData() {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises`).then(response=>response.json()).catch()
    const data = await response.json();
    return data;
}