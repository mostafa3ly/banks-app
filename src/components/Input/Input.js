import React from 'react';
import classes from './Input.module.css';
const input = (props) => {
    let input = null;
    switch (props.element.type) {
        case "text":
        case "email":
            input = (
                <input onBlur={props.blur} name={props.element.inputName} type={props.element.type}
                    placeholder={props.element.inputLabel} className="w-100"
                    onChange={props.changed.bind(this, props.element)} />
            );
            break;

        case "textarea":
            input = (
                <textarea onBlur={props.blur} name={props.element.inputName} type="text" placeholder={props.element.inputLabel}
                    rows="4" className="w-100" onChange={props.changed.bind(this, props.element)}></textarea>);
            break;

        case "number":
            input = (
                <React.Fragment>
                    <button type="button" className={classes.numberButton}
                        onClick={props.numberChanged.bind(this, props.element)}>-</button>

                    <input onBlur={props.blur} name={props.element.inputName} type="number" placeholder={props.element.inputLabel}
                        value={props.value == null ? "" : props.value}
                        onChange={props.changed.bind(this, props.element)} />

                    <button type="button" className={classes.numberButton}
                        onClick={props.numberChanged.bind(this, props.element)}>+</button>
                </React.Fragment>);
            break;

        case "checkbox":
            input = (
                <label className={`float-left ${classes.checkbox}`}>{props.element.inputLabel}
                <input type="checkbox" name={props.element.inputName}
                    onChange={props.changed.bind(this, props.element)} />
                    <span></span>
                </label>
            );
            break;

        case "select":
        case "radio":
            input = (
                <select onBlur={props.blur} form="application" className="w-100" onChange={props.changed.bind(this, props.element)} name={props.element.inputName  }>
                    {
                        props.element.inputChoices.map((element, index) => {
                            return (
                                <option className={classes.option} key={element} value={element}>
                                    {element}
                                </option>
                            )
                        })
                    }
                </select>
            );
            break;

        default:
            break;
    }
    return (
        <div className="row py-2">
            <div className="col-12 text-center">{input}</div>
        </div>
    );
}

export default input;