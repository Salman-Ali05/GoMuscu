import React, { useEffect, useState } from 'react'
import Nav from './Nav';

const Rod = () => {
    const [rod, setRod] = useState({});

    useEffect(() => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch(`/api/rod/${id}`)
            .then(response => response.json())
            .then(data => {
                setRod(data);
            })
            .catch(error => console.log(error));
    }, []);
    return (
        <div>
            <Nav />
            <div className="container">
                <div className="itemInfo">
                    <a href='/' className='back'><span>&#8592;</span></a>
                    <h1>Detail product :</h1>
                    <img src={'/images/' + rod.image} alt='noImage' className='itemImg' />
                    <p>Description : {rod.name} </p>
                    <p>Price : {rod.price} $</p>
                    <p>Weight : {rod.weight}</p>
                </div>
            </div>
        </div>
    )
}

export default Rod