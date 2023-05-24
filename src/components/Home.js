import React, { useEffect, useState } from 'react'

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
            <h1>Home</h1>
            {dumbells.map(dumbell => (

                <div key={dumbell._id}>
                    <a href={'/api/admin/update/' + dumbell._id} ><p>Name: {dumbell.name}</p></a>
                    <p>Price: {dumbell.price}</p>
                    <p>Price: {dumbell.weight}</p>
                </div>

            ))
            }
        </div >

    )
}

export default Home