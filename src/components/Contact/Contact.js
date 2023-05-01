import { PrismicRichText } from '@prismicio/react';
import React, { useState } from 'react';
import Input from './Input';
import * as styles from '../../styles/Contact.module.scss';
import axios from 'axios';

const Contact = ({ data }) => {
    const contactData = data.data;
    let servicesOptions = [];
    if (contactData.services) {
        servicesOptions = contactData.services.map((service) => {
            return {
                id: service.service_title.text,
                value: service.service_title.text,
                checked: false
            };
        })
    }
    let contactForm = {
        name: {
            elementType: "input",
            elementName: contactData.name.text,
            elementConfig: {
                type: "text"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: "input",
            elementName: contactData.email.text,
            elementConfig: {
                type: "email"
            },
            value: "",
            validation: {
                required: true,
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
            },
            valid: false,
            touched: false
        },
        phone: {
            elementType: "input",
            elementName: contactData.phone.text,
            elementConfig: {
                type: "tel"
            },
            value: "",
            validation: {
                required: true,
                pattern: /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/
            },
            valid: false,
            touched: false
        },
        services: {
            elementType: "input",
            elementName: "Service",
            elementConfig: {
                type: "checkbox",
            },
            options: servicesOptions,
            value: "",
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        message: {
            elementType: "textarea",
            elementConfig: {
                type: "text",
                placeholder: contactData.message.text,
            },
            value: "",
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
    }
    const [form, setForm] = useState(contactForm);
    const [formValid, setFormValid] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedContactForm = {
            ...form,
        };
        const updatedEl = { ...updatedContactForm[inputIdentifier] };
        if(inputIdentifier === 'services') {
            let checkedServices = new Array();
            updatedEl.options.map(service => {
              if(service.id === event.target.value) {
                service.checked = event.target.checked;
              }

              if(service.checked) {
                checkedServices.push(service.value);
              }
            });
            updatedEl.value = checkedServices.toString();
        } else {
            updatedEl.value = event.target.value;
            updatedEl.valid = checkValidity(updatedEl.value, updatedEl.validation);
            updatedEl.touched = true;
        }
        updatedContactForm[inputIdentifier] = updatedEl;
        let validForm = true;
        for(let inputId in updatedContactForm){
            validForm = updatedContactForm[inputId].valid && validForm;
        }
        if(!validForm) {
            setFormSubmitted(false);
        }

        setForm(updatedContactForm);
        setFormValid(validForm);
    };

    const formElementsArray = [];
    for (let key in form) {
        formElementsArray.push({
            id: key,
            config: form[key],
        });
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.pattern) {
            isValid = rules.pattern.test(value);
        }
        return isValid;
    }

    const handleSuccess = () => {
        // this.setState({sendButtonCopy: "We will be in touch soon!"});
        // this.setState({formSubmitted: true});
     }
 
     const handlerError = () => {
        //  this.setState({sendButtonCopy: "Sorry, we seem to have an issue."});
        //  this.setState({formSubmitted: true});
     }

     const submitHandler = (e) => {
        e.preventDefault();
        let data = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            services: form.services.value,
            message: form.message.value
        }

        axios.post('/.netlify/functions/sendEmail', JSON.stringify(data)).then(response => {
            console.log(response);
            if(response.status !== 200){
                handlerError();
            } else {
                handleSuccess();
            }
        })
     }

    let formElements = formElementsArray.map((formEl, index) => {
        if (formEl.config.options) {
            let options = formEl.config.options.map((option, optionIndex) => {
                return (
                    <Input elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={option.value}
                        invalid={!option.valid}
                        touched={option.touched}
                        changed={(event) => inputChangedHandler(event, formEl.id)}
                        id={option.id}
                        option={true} 
                        key={optionIndex}/>

                )
            });
            return <div className={styles.ServiceWrap} key={index}><label className={styles.ServiceLabel}>{formEl.config.elementName}</label><div className={styles.ServiceOptionsWrap}>{options}</div></div>;
        } else {
            return (
                <Input
                    elementType={formEl.config.elementType}
                    elementConfig={formEl.config.elementConfig}
                    elementName={formEl.config.elementName}
                    value={formEl.config.value}
                    invalid={!formEl.config.valid}
                    shouldValidate={formEl.config.validation}
                    touched={formEl.config.touched}
                    changed={(event) => inputChangedHandler(event, formEl.id)} 
                    key={index}/>
            );
        }

    });

    return (
        <section className={styles.ContactWrap} id={data.uid}>
            <div className={styles.SectionBreak}></div>
            <div className={styles.ContactContentWrap}>
                {contactData.contact_title ? <PrismicRichText field={contactData.contact_title.richText} /> : ''}
                <form className={styles.ContactFormWrap} name='contact' onSubmit={submitHandler}>
                    {formElements}
                    <button type='submit' className={[styles.ContactSubmitButton, !formValid ? styles.Disabled : ''].join(' ')} disabled={!formValid}>Send</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;