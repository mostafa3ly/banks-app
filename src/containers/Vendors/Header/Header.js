import React from 'react';
import classes from './Header.module.css';

const header = (props) => {
    return (
            <div className="row py-3 px-2">
                <div className="col-3 text-left bank-logo p-0">
                    <img className="w-100 img-responsive" alt="logo" src={props.logo} />
                </div>
                <div className={`col-9 h-100 text-right ${classes.headline} p-2`}>
                    <h2>الاماكن اللي ممكن تقسط منها بدون فوائد من {props.name}</h2>
                </div>
            </div>
    );
}

export default header; 