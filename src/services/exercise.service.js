export async function getExerciseData() {
        return await fetch(`${process.env.REACT_APP_SERVER}/api/gains/exercises`)
                .then(response=>response.json())
                .catch(err=> console.error(err))
}