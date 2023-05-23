import React, { useEffect, useState } from 'react'

const Form = () => {
    const [formData, setFormData] = useState({ name: "", price: "", weight: "" });

    const [dumbells, setDumbells] = useState([]);

    useEffect(() => {
        fetch('/api/dumbells')
            .then(response => response.json())
            .then(data => setDumbells(data))
            .catch(error => console.log(error));
    }, []);

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
            <h1>Create form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

                <label htmlFor="weight">Weight:</label>
                <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} />

                <label htmlFor="images">Images:</label>
                <input type="text" id="images" name="images" value={formData.images} onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>

            <h1>Update form</h1>
            {dumbells.map(dumbell => (
                <div key={dumbell._id}>
                    <form>
                        <p>
                            Name: <input type='text' value={dumbell.name} />
                            Price: <input type='number' value={dumbell.price} />
                            Weight: <input type='text' value={dumbell.weight} />
                            Image : <img src={'' + dumbell.images} />
                            <button onClick={() => console.log(dumbell._id)}>Update</button>
                        </p>
                    </form>
                </div>
            ))}

            <h1>Delete form</h1>
        </div>
    );
}

export default Form