import React from 'react'
import axios from 'axios'

const Form = () => {
    async function submitHandler(e) {
        e.preventDefault()
        const data = new FormData();
        data.append("name", name);
        data.append("price", price);
        data.append("weight", weight);
        data.append("pic", file);
        axios.post("/admin/create");
    }
    return (
        <div>
            <p>Add form</p>
            <form action='/admin/create' method='POST' onSubmit={submitHandler}>
                <input type="text" name='name' />
                <input type="number" name='price' />
                <input type="number" name='weight' />
                <input type="file" name='pic' />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Form