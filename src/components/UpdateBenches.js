import React, { useEffect, useState } from 'react';
import NavAdmin from './NavAdmin';

const UpdateBenches = () => {
    const [bench, setBenches] = useState({});
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        features: ''
    });

    useEffect(() => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch(`/api/bench/${id}`)
            .then(response => response.json())
            .then(data => {
                setBenches(data);
                setFormData({
                    id: data._id,
                    name: data.name || '',
                    price: data.price || '',
                    features: data.features || ''
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
        requestBody.append('features', formData.features);

        if (formData.images) {
            requestBody.append('images', formData.images);
        }

        fetch(`http://localhost:3000/api/admin/updateBench/${bench._id}`, {
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
        fetch(`http://localhost:3000/api/admin/deleteBench/${bench._id}`, {
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
            <h1 className='titles'>Update Benches</h1>
            <div className="container">
                <div className="itemInfo">
                    <a href='/admin' className='back'><span>&#8592;</span></a>
                    <form onSubmit={handleDelete}>
                        <button type='submit' className='delete'>Delete</button>
                    </form>
                    <p>Name: {bench.name}</p>
                    <p>Price: {bench.price}</p>
                    <p>features: {bench.features}</p>
                    <img src={'/images/' + bench.image} alt='noImage' className='itemImg' />
                    <form onSubmit={handleUpdate} encType="multipart/form-data">
                        <input className='inputs' type='text' name='name' value={formData.name} onChange={handleChange} />
                        <input className='inputs' type='number' name='price' value={formData.price} onChange={handleChange} />
                        <input className='inputs' type='text' name='features' value={formData.features} onChange={handleChange} />
                        <input type="file" id="images" name="images" onChange={handleFileChange} className='files' />
                        <button type="submit" className='update'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBenches;
