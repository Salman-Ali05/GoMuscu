import React from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/Home';
import Update from './components/Update';
import Create from './components/Create';

const App = () => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('/create')) {
        return (
            <div>
                <h1>Admin Page</h1>
                <Create />
            </div>
        );
    } else if (currentUrl.includes('/update')) {
        return (
            <div>
                <h1>Admin Page update</h1>
                <Update />
            </div>
        );
    } else {
        // Render default content
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