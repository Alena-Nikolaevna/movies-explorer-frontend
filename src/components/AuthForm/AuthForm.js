import React from "react";
import "./AuthForm.css";
import { Link } from "react-router-dom";

function AuthForm(props) {

    return (
        <section className="auth">
            <h2 className="auth__form-heading">{props.title}</h2>

            <div className="auth__container">

                <form className="auth__form" name={props.name} onSubmit={props.handleSubmit}>
                    {props.children}

                </form>
                <button className={props.classNameBtn} type="submit">{props.button}</button>
                <p className="auth__link-text">{props.text}<Link to={props.links} className="auth__link">{props.link}</Link></p>

            </div>
        </section>
    );
}

export default AuthForm;