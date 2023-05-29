import React, { useEffect, useState } from 'react';
import NavAdmin from './NavAdmin';

const UpdatePlates = () => {
    const [plate, setPlate] = useState({});
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        weight: ''
    });

    useEffect(() => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch(`/api/plate/${id}`)
            .then(response => response.json())
            .then(data => {
                setPlate(data);
                setFormData({
                    id: data._id,
                    name: data.name || '',
                    price: data.price || '',
                    weight: data.weight || ''
                });
            })
            .catch(error => console.log(error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevFormData) => ({ ...prevFormData, images: file }));
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        const requestBody = new FormData();

        requestBody.append('name', formData.name);
        requestBody.append('price', formData.price);
        requestBody.append('weight', formData.weight);

        if (formData.images) {
            requestBody.append('images', formData.images);
        }

        fetch(`http://localhost:3000/api/admin/updateplate/${plate._id}`, {
            method: "POST",
            body: requestBody
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.redirect) {
                    window.location.href = result.redirect;
                    console.log(result);
                }
            });
    };


    const handleDelete = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/admin/deleteplate/${plate._id}`, {
            method: "POST",
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
            <h1 className='titles'>Update plates</h1>
            <div className="container">
                <div className="itemInfo">
                    <a href='/admin' className='back'><span>&#8592;</span></a>
                    <form onSubmit={handleDelete}>
                        <button type='submit' className='delete'>Delete</button>
                    </form>
                    <p>Name: {plate.name}</p>
                    <p>Price: {plate.price}</p>
                    <p>Weight: {plate.weight}</p>
                    <img src={'/images/' + plate.image} alt='noImage' className='itemImg' />
                    <form onSubmit={handleUpdate} encType="multipart/form-data">
                        <input className='inputs' type='text' name='name' value={formData.name} onChange={handleChange} />
                        <input className='inputs' type='number' name='price' value={formData.price} onChange={handleChange} />
                        <input className='inputs' type='text' name='weight' value={formData.weight} onChange={handleChange} />
                        <input type="file" id="images" name="images" onChange={handleFileChange} className='files' />
                        <button type="submit" className='update'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePlates;
