import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

// import ComicsAPI from "../../api/ComicsAPI"

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const App = () => {

    const [selectedChar, setSelectedChar] = useState(null)

    const changeCharSelected = (id) => {
        setSelectedChar(id)
    }
    
    // console.log(this.state.selectedChar)

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>

                <div className="char__content">
                    <CharList changeCharSelected={changeCharSelected} charId={selectedChar} />
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}


export default App;