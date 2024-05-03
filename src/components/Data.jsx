import { use } from 'react';


export function Data({url, shouldFetch}){
    let data = "[Default Data]";
    if(shouldFetch){
        data = use(fetch(url).then(res=>res.json()));
    }
    return data;
}