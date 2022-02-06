import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from '../pages'
const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch> 
                        {/* Route 5.3.0 path="/" - прописываем, чтобы указать, что это первая страница, которая идет изначально */}
                        <Route path="/" exact>
                            <MainPage/>
                        </Route>
                        <Route path="/comics" exact>
                            <ComicsPage/>
                        </Route>
                    </Switch>

                    {/* <Routes> Router 6.2.1
                        <Route path="/" element={<MainPage />} />                            
                        <Route path="/comics" element={<ComicsPage />}/>                            
                    </Routes> */}
                </main>
            </div>
        </Router>
    )
}


export default App;