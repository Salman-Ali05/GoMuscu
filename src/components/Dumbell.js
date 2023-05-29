import React, { useEffect, useState } from 'react'
import Nav from './Nav';

const Dumbell = () => {
    const [dumbell, setDumbell] = useState({});

    useEffect(() => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch(`/api/dumbell/${id}`)
            .then(response => response.json())
            .then(data => {
                setDumbell(data);
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
                    <img src={'/images/' + dumbell.images} alt='noImage' className='itemImg' />
                    <p>Description : {dumbell.name} </p>
                    <p>Price : {dumbell.price} $</p>
                    <p>Weight : {dumbell.weight}</p>
                </div>
            </div>
        </div>
    )
}

export default Dumbell