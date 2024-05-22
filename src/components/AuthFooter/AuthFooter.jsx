import { React } from "react";
import './AuthFooter.css';
import { Link } from "react-router-dom";
import LangIcon from '../../images/icons8-world-24.png';

function AuthFooter() {

    return (
        <footer className="footer">
            <Link to="#" className="footer__link footer__link_lang">
                <img className="footer__icon" src={LangIcon} alt="Icon World" />
                <p>English</p>
            </Link>
            <Link className="footer__link" to="https://fastotv.com/#/privacy">Privacy policy</Link>
            <Link className="footer__link" to="https://fastotv.com/#/terms">Terms & conditions</Link>
            <p className="footer__link">1.4.13</p>
        </footer>

    );
}

export default AuthFooter;