import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphnagesMap from './pages/OrphnagesMap'


function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/app" component={OrphnagesMap}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes
