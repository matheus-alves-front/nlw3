import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing/Landing'
import OrphnagesMap from './pages/OrphnagesMap/OrphnagesMap'
import Orphnage from './pages/Orphnage/Orphnage'
import CreateOrphnage from './pages/CreateOrphnage/CreateOrphnage'


function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/app" component={OrphnagesMap}></Route>

                <Route path="/orphnages/create" component={CreateOrphnage}></Route>
                <Route path="/orphnages/:id" component={Orphnage}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes
