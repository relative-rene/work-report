const ReleaseNotes = () => {
    return (<>
        <h2>Work Report Features</h2>
        <ul>
            <li>The backend was written in <b>Typescript</b> with Express.js on Mongo Atlas Database. </li>
            <li>The frontend what created with <b>React</b> and no other libraries or premade components.</li>
            <li>All <b>animations</b> and <b>transtion</b> are custom CSS effort with strict adherence to best practice for performance.</li>
            <li>Authentication and authorization protocols recognize Clients, Admin and Super Admin.</li>
            <li>HTML form <b>validations</b> offer users some guidances on form expectations and errors.</li>
            <li>Once inputs have been submitted the results will be displayed on a fully custom <b>Table</b> in Sets, Stats and Exercise page.</li>
            <li>Edit any row on a table by clicking on row.</li>
            <li>The Reports page offers <b>bar</b>, <b>pie</b> and <b>line charts</b>  for a more visual experience of the data.</li>
            <li>Routing was written with createHashRouter because of <b>gh-pages</b> limitations.</li>
            <li>Work Report Logo is a custom effort using Bing Copilot AI.</li>
        </ul>
        <h4>The quill icon on the side panel, will offer insight into future application development</h4>
    </>);
}



export default ReleaseNotes;