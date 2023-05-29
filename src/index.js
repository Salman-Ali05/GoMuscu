import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/Home';
import UpdateDumbell from './components/UpdateDumbell';
import CreateDumbell from './components/CreateDumbell';
import Connection from './components/Connection';
import Dumbell from './components/Dumbell';
import AdminHome from './components/AdminHome';
import Plate from './components/Plate';
import Bench from './components/Bench';
import Rod from './components/Rod';
import UpdateBenches from './components/UpdateBenches';
import CreateBenches from './components/CreateBenches';
import UpdateRods from './components/UpdateRods';
import UpdatePlates from './components/UpdatePlates';

const App = () => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('/api/admin/createDumbell')) {
        return (
            <div>
                <CreateDumbell />
            </div>
        );
    } else if (currentUrl.includes('/api/admin/updateDumbell')) {
        return (
            <div>
                <UpdateDumbell />
            </div>
        );
    }
    else if (currentUrl.includes('/api/admin/createBench')) {
        return (
            <div>
                <CreateBenches />
            </div>
        );
    }
    else if (currentUrl.includes('/api/admin/updateBench')) {
        return (
            <div>
                <UpdateBenches />
            </div>
        );
    }
    else if (currentUrl.includes('/api/admin/createRod')) {
        return (
            <div>
                <UpdateRods />
            </div>
        );
    }
    else if (currentUrl.includes('/api/admin/updateRod')) {
        return (
            <div>
                <UpdateRods />
            </div>
        );
    } else if (currentUrl.includes('/api/admin/createPlate')) {
        return (
            <div>
                <UpdatePlates />
            </div>
        );
    }
    else if (currentUrl.includes('/api/admin/updatePlate')) {
        return (
            <div>
                <UpdatePlates />
            </div>
        );
    }
    else if (currentUrl.includes('/admin')) {
        return (
            <div>
                <AdminHome />
            </div>
        );
    }
    if (currentUrl.includes('/user/connect')) {
        return (
            <div>
                <h1>Connection page</h1>
                <Connection />
            </div>
        );
    } else if (currentUrl.includes('/client/dumbell/')) {
        return (
            <div>
                <Dumbell />
            </div>
        );
    } else if (currentUrl.includes('/client/plate/')) {
        return (
            <div>
                <Plate />
            </div>
        );
    } else if (currentUrl.includes('/client/bench/')) {
        return (
            <div>
                <Bench />
            </div>
        );
    } else if (currentUrl.includes('/client/rod/')) {
        return (
            <div>
                <Rod />
            </div>
        );
    } else if (currentUrl.includes('/logout')) {
        return (
            <div>
                <Home />
            </div>
        );
    } else {
        return (
            <div>
                {/* <h1>Default Page</h1> */}
                <Home />
            </div>
        );
    }
};

export default App
const root = createRoot(document.querySelector("#app"));
root.render(<App />);