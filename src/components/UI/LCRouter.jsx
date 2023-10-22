import React from "react";
import {Route , Routes } from "react-router-dom";
import { routes } from "./router";

const LCRouter = () => {

    return(

        <Routes>
            {routes.map(route => 
                <Route  
                    path = {route.path}
                    Component = {route.component}/>
            )}

        </Routes>
    )
}

export default LCRouter ;