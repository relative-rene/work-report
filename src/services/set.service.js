export async function getSetData(user_id) {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${user_id}/read_sets`);
    const data = await response.json();
    return data;
}