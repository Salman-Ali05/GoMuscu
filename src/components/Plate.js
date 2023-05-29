import React, { useEffect, useState } from 'react'
import Nav from './Nav';

const Plate = () => {
    const [plate, setPlate] = useState({});

    useEffect(() => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch(`/api/plate/${id}`)
            .then(response => response.json())
            .then(data => {
                setPlate(data);
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
                    <img src={'/images/' + plate.image} alt='noImage' className='itemImg' />
                    <p>Description : {plate.name} </p>
                    <p>Price : {plate.price} $</p>
                    <p>Weight : {plate.weight}</p>
                </div>
            </div>
        </div>
    )
}

export default Plate