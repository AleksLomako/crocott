import { React } from "react";
import './EmptyContent.css';
import errorIcon from '../../images/error.png';


function EmptyContent({emptyText}) {
    
    return (
            <section className='empty'>
                <img src={errorIcon} alt="" />
                <h1>{emptyText}</h1>
            </section>
    );
}

export default EmptyContent;