import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import AppHeader from "../appHeader/AppHeader";
// import { MainPage, ComicsPage, SingleComicPage } from '../pages'
import Preloader from '../spinner/Preloader';


// динамические импорты должны идти после основных статических импортов 
const NotFound = lazy(() => import('../notFound/NotFound'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'))




const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    {/* Suspense с обязательным атрибутом fallback на случай пока lezy грузится и если в lezy произойдет ошибка */}
                    <Suspense fallback={<Preloader/>}>
                        <Switch>
                            {/* Route 5.3.0 path="/" - прописываем, чтобы указать, что это первая страница, которая идет изначально */}
                            <Route path="/" exact>
                                <MainPage />
                            </Route>
                            <Route path="/comics" exact>
                                <ComicsPage />
                            </Route>
                            <Route path="/comics/:comicId" exact>
                                <SingleComicPage />
                            </Route>
                            <Route path="*" >
                                <NotFound />
                            </Route>
                        </Switch>
                    </Suspense>

                    {/* 
                    Router 6.2.1
                    npm i react-router-dom@6.2.1 --save
                    <Routes> 
                        <Route path="/" element={<MainPage />} />                            
                        <Route path="/comics" element={<ComicsPage />}/>                            
                    </Routes> */}
                </main>
            </div>
        </Router>
    )
}


export default App;