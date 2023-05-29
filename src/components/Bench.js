import React, { useEffect, useState } from 'react'
import Nav from './Nav';

const Bench = () => {
    const [bench, setBench] = useState({});

    useEffect(() => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch(`/api/bench/${id}`)
            .then(response => response.json())
            .then(data => {
                setBench(data);
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
                    <img src={'/images/' + bench.image} alt='noImage' className='itemImg' />
                    <p>Description : {bench.name} </p>
                    <p>Price : {bench.price} $</p>
                    <p>Features : {bench.features}</p>
                </div>
            </div>
        </div>
    )
}

export default Bench