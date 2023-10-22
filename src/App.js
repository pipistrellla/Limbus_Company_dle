import './App.css';
import LCHeader from './components/UI/LCHeader/LCHeader';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import LCRouter from './components/UI/LCRouter';

function App() {
    return (


            <BrowserRouter>

                <div className="App">

                    <LCHeader/>
                    
                    <LCRouter/>
                    
                </div>
            </BrowserRouter>
            
            


    );
}

export default App;
