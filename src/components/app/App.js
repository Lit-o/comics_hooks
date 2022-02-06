import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

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
                            <MainPage />
                        </Route>
                        <Route path="/comics" exact>
                            <ComicsPage />
                        </Route>
                        <Route path="*" >
                            <><h1>Not found</h1><Link to="/" style={{textDecoration: "underline", paddingTop: 20}}>Go to main page</Link></>
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