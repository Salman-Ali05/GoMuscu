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

    const handleUpdate = (event) => {
        console.log("tt");
        event.preventDefault();
        fetch(`http://localhost:3000/api/admin/update/${dumbell._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
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
            <form onSubmit={handleUpdate}>
                <input type='text' name='name' value={formData.name} onChange={handleChange} />
                <input type='number' name='price' value={formData.price} onChange={handleChange} />
                <input type='text' name='weight' value={formData.weight} onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Update;
