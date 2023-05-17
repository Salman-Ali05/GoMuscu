import React from 'react'
import { createRoot } from 'react-dom'
import Form from './components/Form'

const App = () => {
    return (
        <div>
            <h1>Here we are in react</h1>
            <Form />
        </div>
    )
}

export default App
const root = createRoot(document.querySelector("#app"));
root.render(<App />);