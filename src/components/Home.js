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

    const [benches, setBenches] = useState([]);

    useEffect(() => {
        fetch('/api/benches')
            .then(response => response.json())
            .then(data => setBenches(data))
            .catch(error => console.log(error));
    }, []);

    const [rods, setRods] = useState([]);

    useEffect(() => {
        fetch('/api/rods')
            .then(response => response.json())
            .then(data => setRods(data))
            .catch(error => console.log(error));
    }, []);

    const [plates, setPlates] = useState([]);

    useEffect(() => {
        fetch('/api/plates')
            .then(response => response.json())
            .then(data => setPlates(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <Nav />
            <div className="Image"></div>
            <div className="container">
            <div class="contain_title"><h3>Dumbells :</h3></div>
                <div class="container_dumbells">
                    
                    {dumbells.map(dumbell => (
                        <div key={dumbell._id}>
                            <a href={'/client/dumbell/' + dumbell._id}><div className="container_item container_dumbells_item"><p>Name: {dumbell.name}</p>
                                <p>Price: {dumbell.price}</p>
                                <p>Weight: {dumbell.weight}</p>
                            </div>
                            </a>

                        </div>

                    ))
                    }
                </div>

                <div class="contain_title"><h3>Benches :</h3></div>
                <div class="container_benches">
                    {benches.map(bench => (
                        <div key={bench._id}>
                            <a href={'/client/bench/' + bench._id}><div class="container_item container_item_benches"><p>Name: {bench.name}</p>
                                <p>Price: {bench.price}</p>
                                <p>Features: {bench.features}</p>
                            </div>
                            </a>

                        </div>
                    ))
                    }
                </div>

                <div class="contain_title"><h3>Rods :</h3></div>
                <div class="container_rods">
                    {rods.map(rod => (
                        <div key={rod._id}>
                            <a href={'/client/rod/' + rod._id}><div className="container_item container_item_rods"><p>Name: {rod.name}</p>
                                <p>Price: {rod.price}</p>
                                <p>Weight: {rod.weight}</p>
                            </div>
                            </a>

                        </div>
                    ))
                    }

                </div>


                {/* <h3>plate :</h3>
                <div class="container_plate">
                    {rods.map(rod => (
                        <div key={rod._id}>
                            <a href={'/client/plate/' + rod._id}><div className="container_item container_item_plate"><p>Name: {rod.name}</p>
                                <p>Price: {rod.price}</p>
                                <p>Weight: {rod.weight}</p>
                            </div>
                            </a>

                        </div>
                    ))
                    }

                </div> */}
            
                {/* <h3>Plates :</h3>
                <div class="container_plate">
                    {plates.map(plate => (
                        <div key={plate._id}>
                            <a href={'/client/plate/' + plate._id}><div className="container_item"><p>Name: {plate.name}</p>
                                <p>Price: {plate.price}</p>
                                <p>Weight: {plate.weight}</p>
                            </div>
                            </a>

                        </div>
                    ))
                    }
                </div> */}
            </div>
        </div >

    )
}

export default Home