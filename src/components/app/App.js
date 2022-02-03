import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

// import ComicsAPI from "../../api/ComicsAPI"

import decoration from '../../resources/img/vision.png';
import { Component } from "react";

class App extends Component {
    state = {
        selectedChar: null
    }

    changeCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }
    render() {
        // console.log(this.state.selectedChar)
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>

                    <div className="char__content">
                        <CharList changeCharSelected={this.changeCharSelected} charId={this.state.selectedChar}/>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }

}

export default App;