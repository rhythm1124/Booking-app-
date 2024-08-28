import React from 'react';
import '../styles/main_form.css';

const Form = () => {
    return (
        <div>
            <div class="side-container">
                <ul>
                    <li>Details</li>
                    <li>Event</li>
                    <li>Confirm</li>
                </ul>
            </div>
            <h1>main form details</h1>
            <ul class="color-theme">
                <li id="a">cool blue</li>
                <li id="b">light greyish</li>
                <li id="c">macadamia</li>
                <li id="d">redwood</li>
                <li id="e">burnt under</li>
            </ul>
        </div>
    )
}

export default Form;