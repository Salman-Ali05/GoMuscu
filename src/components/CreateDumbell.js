import React, { useState } from 'react';
import NavAdmin from './NavAdmin';

const CreateDumbell = () => {
    const [formData, setFormData] = useState({ name: '', price: '', weight: '', images: null });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const image = file ? file : null; // Set to null if no file is selected
        setFormData((prevFormData) => ({ ...prevFormData, images: image }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('price', formData.price);
        formDataObj.append('weight', formData.weight);
        formDataObj.append('images', formData.images);

        fetch('http://localhost:3000/api/admin/createDumbell', {
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
                <div className="dumbellInfo">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input className='inputs' type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

                        <label htmlFor="price">Price:</label>
                        <input className='inputs' type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

                        <label htmlFor="weight">Weight:</label>
                        <input className='inputs' type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} />

                        <label htmlFor="images">Images:</label>
                        <input className='files' type="file" id="images" name="images" onChange={handleFileChange} />

                        <button type="submit" className='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDumbell;
