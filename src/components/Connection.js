import React, { useState } from 'react';

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
            <h1>Connection</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="idd" placeholder="idd" value={formData.name} onChange={handleChange} />

                <label htmlFor="pass">Pass:</label>
                <input type="password" id="pass" name="pass" placeholder="pass" value={formData.pass} onChange={handleChange} />

                <input type="submit" value="Connect" />
            </form>
        </div>
    );
};

export default Connection;