import React, { useEffect, useState } from 'react'
import NavAdmin from './NavAdmin';

const AdminHome = () => {

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
            <NavAdmin />
            <div className="Image"></div>
            <div className="container">
                <h3>Dumbells :</h3>
                {dumbells.map(dumbell => (
                    <div key={dumbell._id}>
                        <a href={'/api/admin/updateDumbell/' + dumbell._id} className='item'>
                            <div className="container_item"><p>Name: {dumbell.name}</p>
                                <p>Price: {dumbell.price}</p>
                                <p>Weight: {dumbell.weight}</p>
                            </div>
                        </a>
                    </div>

                ))
                }

                <h3>Benches :</h3>
                {benches.map(bench => (
                    <div key={bench._id}>
                        <a href={'/api/admin/updateBench/' + bench._id} className='item'>
                            <div className="container_item"><p>Name: {bench.name}</p>
                                <p>Price: {bench.price}</p>
                                <p>Features: {bench.features}</p>
                            </div>
                        </a>
                    </div>

                ))
                }
                <h3>Plates :</h3>
                {plates.map(plate => (
                    <div key={plate._id}>
                        <a href={'/api/admin/updatePlate/' + plate._id} className='item'>
                            <div className="container_item"><p>Name: {plate.name}</p>
                                <p>Price: {plate.price}</p>
                                <p>Weight: {plate.weight}</p>
                            </div>
                        </a>
                    </div>

                ))
                }
                <h3>Rods :</h3>
                {rods.map(rod => (
                    <div key={rod._id}>
                        <a href={'/api/admin/updateRod/' + rod._id} className='item'>
                            <div className="container_item"><p>Name: {rod.name}</p>
                                <p>Price: {rod.price}</p>
                                <p>Weight: {rod.weight}</p>
                            </div>
                        </a>
                    </div>

                ))
                }
            </div>
        </div >

    )
}

export default AdminHome