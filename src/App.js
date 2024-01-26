import './styles/App.css'
import LCHeader from './components/UI/LCHeader/LCHeader';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import LCRouter from './components/UI/LCRouter';
import LCRandomEmoji from './components/UI/LCRandomEmoji/LCRandomEmoji';

function App() {
    return (


            <BrowserRouter>

                <div className="App">
                    <LCRandomEmoji>
                        
                    </LCRandomEmoji>

                    <LCHeader/>
                    
                    <LCRouter/>
                    
                </div>
            </BrowserRouter>
            
            


    );
}

export default App;
