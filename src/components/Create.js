import React, { useEffect, useState } from 'react'

const Create = () => {
    const [formData, setFormData] = useState({ name: "", price: "", weight: "" });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/admin/create', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.redirect) {
                    window.location.href = result.redirect;
                    console.log(result);
                }
            })
    };
    return (
        <div>
            <h1 className='title'>Create form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

                <label htmlFor="weight">Weight:</label>
                <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} />

                <label htmlFor="images">Images:</label>
                <input type="file" id="images" name="images" value={formData.images} onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Create