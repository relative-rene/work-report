import { use } from 'react';


function Data({url, shouldFetch}){
    let data = "[Default Data]";
    if(shouldFetch){
        data = use(fetch(url).then(res=>res.json()));
    }
    return data;
}

export default Data;