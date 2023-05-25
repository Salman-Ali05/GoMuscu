import React, { useEffect, useState } from 'react';

const Update = () => {
    const [dumbell, setDumbell] = useState({});
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        weight: ''
    });

    useEffect(() => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch(`/api/dumbell/${id}`)
            .then(response => response.json())
            .then(data => {
                setDumbell(data);
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

        fetch(`http://localhost:3000/api/admin/update/${dumbell._id}`, {
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
        fetch(`http://localhost:3000/api/admin/delete/${dumbell._id}`, {
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
            <h1 className='title'>Update Dumbell</h1>
            <p>Name: {dumbell.name}</p>
            <p>Price: {dumbell.price}</p>
            <p>Weight: {dumbell.weight}</p>
            <img src={'/images/' + dumbell.images} alt='noImage' height="100px" width="100px" />
            <form onSubmit={handleUpdate} encType="multipart/form-data">
                <input type='text' name='name' value={formData.name} onChange={handleChange} />
                <input type='number' name='price' value={formData.price} onChange={handleChange} />
                <input type='text' name='weight' value={formData.weight} onChange={handleChange} />
                <input type="file" id="images" name="images" onChange={handleFileChange} />
                <button type="submit">Update</button>
            </form>
            <form onSubmit={handleDelete}>
                <button type='submit' style={{ color: "red" }}>Delete</button>
            </form>
        </div>
    );
};

export default Update;
