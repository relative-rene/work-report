export async function setsLoader({params}){
    console.log('setsLoader', params)
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/profiles/${params.sets_id}/all_sets/read`);
    const data = await response.json();
    return data;
}