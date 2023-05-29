import React, { useState } from 'react';
import NavAdmin from './NavAdmin';

const CreateBenches = () => {
    const [formData, setFormData] = useState({ name: '', price: '', features: '', image: null });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const image = file ? file : null; // Set to null if no file is selected
        setFormData((prevFormData) => ({ ...prevFormData, image: image }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('price', formData.price);
        formDataObj.append('features', formData.features);
        formDataObj.append('image', formData.image);

        fetch('http://localhost:3000/api/admin/createBench', {
            method: 'POST',
            body: formDataObj,
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.redirect) {
                    window.location.href = result.redirect;
                    console.log(result);
                }
            });
    };

    return (
        <div>
            <NavAdmin />
            <h1 className="titles">Create form</h1>
            <div className="container">
                <div className="itemInfo">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input className='inputs' type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

                        <label htmlFor="price">Price:</label>
                        <input className='inputs' type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

                        <label htmlFor="features">features:</label>
                        <input className='inputs' type="text" id="features" name="features" value={formData.features} onChange={handleChange} />

                        <label htmlFor="image">image:</label>
                        <input className='files' type="file" id="image" name="image" onChange={handleFileChange} />

                        <button type="submit" className='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBenches;
