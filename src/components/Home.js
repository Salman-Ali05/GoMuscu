import React, { useEffect, useState } from 'react'
import Nav from './Nav';

const Home = () => {

    const [dumbells, setDumbells] = useState([]);

    useEffect(() => {
        fetch('/api/dumbells')
            .then(response => response.json())
            .then(data => setDumbells(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {/* <h1>Home</h1> */}
            <Nav />
            <div class="Image">
                <div class="text">
                    <h2>BUILD</h2>
                    <p>YOUR BODY - TRANSFORM YOUR</p>
                    <p>LIFE </p>
                </div>
            </div>
        <div class="container">
            
            {dumbells.map(dumbell => (

                <div key={dumbell._id}>
                    <div class="container_dumbell"><a href={'/api/admin/update/' + dumbell._id} ><p>Name: {dumbell.name}</p></a>
                        <p>Price: {dumbell.price}</p>
                        <p>Price: {dumbell.weight}</p>
                    </div>
                </div>
           

            ))
            }
               </div>
        </div >

    )
}

export default Home