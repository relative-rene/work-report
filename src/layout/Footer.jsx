import { Link } from 'react-router-dom';

const Footer = ({openNotes}) => {

    return (
        <footer className="Footer">
            <Link target="_blank" rel="noopener noreferrer" to="https://www.linkedin.com/in/reneare11ano/"><i className="fa-brands fa-linkedin fa-2xl" /></Link>
            <Link target="_blank" rel="noopener noreferrer" to="https://github.com/relative-rene/work-report"><i className="fa-brands fa-github fa-2xl" /></Link>
            <i onClick={openNotes} className="fa-solid fa-circle-info fa-2xl" />
        </footer>
    )
}

export default Footer;