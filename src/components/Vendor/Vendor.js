import React from 'react';
import classes from './Vendor.module.css';
import sendImage from '../../assets/send_blue.png'
const vendor = (props) => {

    return (
        <div className={`row ${classes.vendor}`}>
            <div className={`col-3 text-center p-0 ${classes.logo}`}>
                <img
                    src={props.logo ? props.logo : "https://www.asksally.me/app/uploads/2019/02/cropped-Sally-logo-border.png"}
                    alt={props.name}
                    className="h-100 w-100" />
            </div>
            <div className="col-9">
                <div className={`row ${classes.data}`}>
                    <div className={`col-10 p-0 ${classes.name}`}>
                        <h5>{props.name}</h5>
                    </div>
                    <div className="col-2 p-0 text-right">
                        <a target="_blank" rel="noopener noreferrer"
                            href={props.link !== null && props.link.startsWith("https://") ? props.link : "https://" + props.link}>
                            <img src={sendImage} alt="vendor" width="24" /></a>
                    </div>
                    <div className="col-12 p-0">
                        <i className={`fa fa-star ${classes.star}`}></i>
                        <i className={`fa fa-star ${classes.star}`}></i>
                        <i className={`fa fa-star ${classes.star}`}></i>
                        <i className={`fa fa-star ${classes.star}`}></i>
                        <i className={`fa fa-star ${classes.star}`}></i>
                        <span className={classes.reviews}>1,200 reviews</span>
                    </div>
                    <span className={`col-10 p-0 ${classes.details}`}>Californian</span>
                    <span className={`col-2 p-0 text-right ${classes.details}`}>$$</span>
                    <span className={`col-10 p-0 ${classes.details}`}>Mission</span>
                    <span className={`col-2 p-0 text-right ${classes.details}`}>0.3 mi</span>
                </div>
            </div>
        </div>
    );
}

export default vendor;