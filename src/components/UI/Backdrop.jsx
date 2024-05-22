import { useEffect } from "react";


const Backdrop = (props) => {
    useEffect(() => {
        if (props.show) {
            document.body.classList.add('--open-modal')
        } else {
            document.body.classList.remove('--open-modal');
        }
    }, [props.show])

    return (props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null);
}


export default Backdrop;