import React from 'react'
import { createRoot } from 'react-dom/client'
import Form from './components/Form'
import Home from './components/Home';

const App = () => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('/admin')) {
        return (
            <div>
                <h1>Admin Page</h1>
                <Form />
            </div>
        );
    } else {
        // Render default content
        return (
            <div>
                <h1>Default Page</h1>
                <Home />
            </div>
        );
    }
};

export default App
const root = createRoot(document.querySelector("#app"));
root.render(<App />);