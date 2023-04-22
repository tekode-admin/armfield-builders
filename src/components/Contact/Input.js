import React from "react";
import * as styles from '../../styles/Input.module.scss';

const Input = (props) => { 
    const inputClasses = [styles.InputEl];
    let inputEl;
    const key = props.id;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
    }

    if (props.elementType === "textarea") {
        inputClasses.push(styles.InputTextArea);
        inputEl =
            (
                <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                    key={key}
                />
            );
    } else {
        inputEl = <input className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            key={key}
            id={props.id}
        />;
    }

    if(props.option) {
        return (
            <div className={[styles.ContactFormInputWrap, styles.Option].join(' ')}>
                {inputEl}
                {props.value ? <label htmlFor={props.id}>{props.value}</label> : null }
            </div>
        );
    } else {
        return (
            <div className={styles.ContactFormInputWrap}>
                {inputEl}
                {props.elementName && props.value ? <label className={styles.LabelValue} htmlFor={props.id}>{props.elementName}</label> : <label htmlFor={props.id}>{props.elementName}</label> }
            </div>
        );
    }
}

export default Input;