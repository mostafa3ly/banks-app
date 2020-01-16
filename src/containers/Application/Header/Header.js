import React from 'react';
import classes from './Header.module.css';

const header = (props) => {
    return (
            <div className="row py-3 px-2">
                <div className="col-3 text-left p-0">
                    <img className="w-100 img-responsive" alt="logo" src={props.image} />
                </div>
                <div className={`col-9 h-100 text-right ${classes.headline} p-0`}>
                    <h2>ادخل بياناتك الشخصية للتقديم علي بطاقه إئتمان من بنك مصر</h2>
                </div>
            </div>
    );
}

export default header; 