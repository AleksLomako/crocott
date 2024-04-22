import { React } from "react";
import './AuthFooter.css';
import { Link } from "react-router-dom";

function AuthFooter() {

    return (
        <footer className="footer">
            <Link className="footer__link" to="https://fastotv.com/#/privacy">Privacy policy</Link>
            <Link className="footer__link" to="https://fastotv.com/#/terms">Terms & conditions</Link>
            <p className="footer__link">1.4.13</p>
        </footer>

    );
}

export default AuthFooter;