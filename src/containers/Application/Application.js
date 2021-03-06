import React, { Component } from 'react';
import Header from './Header/Header';
import axios from 'axios';
import classes from './Application.module.css';
import Input from '../../components/Input/Input';
import sendImage from '../../assets/send_white.png'
import Loader from '../../components/UI/Loader/Loader';
import FadeIn from '../../components/UI/FadeIn/FadeIn';

class Application extends Component {
    state = {
        application: {
            fb_id: "",
            form_id: "",
            image: "",
            form: {
                elements: null,
            },
            formData: {}
        },
        error: false,
        loading: true
    }

    getFormData() {
        const params = this.props.match.params;
        const queryParams = new URLSearchParams(this.props.location.search)
        const fbId = queryParams.get('fb_id');

        axios.post('/bank/form', { bank: params.bank, card: params.card }).then((response) => {
            const data = response.data;
            this.setState({
                application: {
                    fb_id: fbId,
                    form_id: data.application.form_id,
                    image: data.application.unified_img,
                    form: { elements: data.application.form.elements },
                    formData: {}
                },
                error: false,
                loading: false
            })
        }).catch(error => {
            this.setState({ error: true, loading: false })
        });
    }
    componentDidMount() {
        this.getFormData();
        // axios.defaults.baseURL = "/";
        // axios.get('../../application.json').then((response) => {
        //     const data = response.data;
        //     this.setState({
        //         application: {
        //             form_id: data.application.form_id,
        //             image: data.application.unified_img,
        //             form: { elements: data.application.form.elements },
        //             formData: {}
        //         }
        //         , status: "success"
        //     })
        // }).catch(error => {
        //     this.setState({ status: "failed" })
        // });
    }

    lostFocusHandler = () => {
        const application = this.state.application;
        if (application.changed) {
            application.changed = false;
            this.setState({ application: application });
            let params = {
                fb_id: this.state.application.fb_id,
                form_id: this.state.application.form_id,
                submitted: false,
                ...application.formData
            };
            axios.post('/form/submit', params).then(response => {
                console.log(response);
            }).catch(error=>{
                console.log(error);
            })
        }
    }

    getForm = () => {
        return this.state.application.form.elements.map((element, index) => {
            return (<Input
                blur={this.lostFocusHandler}
                key={element.inputName}
                element={element}
                changed={this.inputChangedHandler}
                value={this.state.application.formData[element.inputName]}
                numberChanged={this.numberChangedHandler}
            />);
        });
    }

    inputChangedHandler = (element, event) => {
        let application = this.state.application;
        let value = event.target.value;
        if (element.type === "number") {
            value = parseInt(value);
            if (isNaN(value))
                value = null;
        }
        if (element.type === "checkbox") {
            value = event.target.checked
        }
        application.formData[element.inputName] = value;
        application.changed = true;
        this.setState({ application: application });
    }

    numberChangedHandler = (element, event) => {
        let application = this.state.application;
        const operation = event.target.innerText;
        this.setState((prevState) => {
            let value = prevState.application.formData[element.inputName];
            if (value === undefined) value = null;
            let newVal = operation === "+" ? value + 1 : value - 1;
            application.formData[element.inputName] = newVal;
            application.changed = true;
            return { application: application }
        });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        let params = {
            fb_id: this.state.application.fb_id,
            form_id: this.state.application.form_id,
            submitted: true,
            ...this.state.application.formData
        };
        axios.post('/form/submit', params).then(response => {
            console.log(response);
        }).catch(error=>{
            console.log(error);
        })
    }

    render() {
        let form = this.state.error ? <h1 className="text-center">Not found</h1> : <Loader />
        if (this.state.application.form.elements) {
            const formElements = this.getForm();
            form = (
                <FadeIn>
                    <header className="container">
                        <Header image={this.state.application.image} />
                    </header>
                    <form id="application"
                        onSubmit={this.formSubmitHandler}
                        method="post" action={`${axios.defaults.baseURL}/form/submit`}>
                        <div className={`container ${classes.form}`}>
                            {formElements}
                        </div>
                        <footer>
                            <button type="submit" className={`btn ${classes.submit}`} >
                                <img src={sendImage} alt="submit" />
                                <span>تأكيد</span>
                            </button>
                        </footer>
                    </form>
                </FadeIn>
            );
        }
        return form;

    }
}
export default Application;