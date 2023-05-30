import React, { useState } from 'react';
import Nav from './Nav';

const Connection = () => {
    const [formData, setFormData] = useState({
        idd: '',
        pass: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the form data to the server
        fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.redirect) {
                    window.location.href = result.redirect;
                } else {
                    console.log(result.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Nav />
            <h1 className='titles'>Connection</h1>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" className='inputs' name="idd" placeholder="Idd" value={formData.name} onChange={handleChange} />

                    <label htmlFor="pass">Pass:</label>
                    <input type="password" id="pass" className='inputs' name="pass" placeholder="Pass" value={formData.pass} onChange={handleChange} />

                    <input type="submit" value="Connect" className='submit' />
                </form>
            </div>
        </div>
    );
};

export default Connection;