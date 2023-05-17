import React from 'react'
import { createRoot } from 'react-dom'

const App = () => {
    return (
        <div>
            <h1>Here we are in react</h1>
        </div>
    )
}

export default App
const root = createRoot(document.querySelector("#app"));
root.render(<App />);