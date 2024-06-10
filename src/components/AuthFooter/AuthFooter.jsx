import { React } from "react";
import { useEffect, useState } from 'react';
import './AuthFooter.css';
import LangIcon from '../../images/icons8-world-24.png';
import mainApi from '../../utils/MainApi';

function AuthFooter() {
    const [linkPrivacyTerms, setLinkPrivacyTerms] = useState('')
    useEffect(() => {
        mainApi.getInfo()
            .then((res) => {
                setLinkPrivacyTerms(res.data.brand.landing)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [linkPrivacyTerms])


    return (
        <footer className="footer">
            <a href="#" className="footer__link footer__link_lang">
                <img className="footer__icon" src={LangIcon} alt="Icon World" />
                <p>English</p>
            </a>
            <a className="footer__link" href={linkPrivacyTerms + "/#/pivacy"}>Privacy policy</a>
            <a className="footer__link" href={linkPrivacyTerms + "/#/terms"}>Terms & conditions</a>
            <p className="footer__link">1.0.0</p>
        </footer>

    );
}

export default AuthFooter;