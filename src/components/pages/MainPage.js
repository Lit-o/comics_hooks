import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    const changeCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <>
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
        </>
    )
}

export default MainPage
