import { Component } from 'react';
import ComicsAPI from '../../api/ComicsAPI';
import { Error } from '../error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Preloader from '../spinner/Preloader';

class RandomChar extends Component {
    // constructor(props) {
    //     super(props);
    //     // первый вызов функции не очень хорошо делать в конструкторе
    //     this.updateChar()
    //     // this.state = {
    //     // }
    // }

    // синтаксис полей классов
    state = {
        char: {},
        isLoading: true,
        isError: false,
    }
        // name: null,
        // description: null,
        // thumbnail: null,
        // homepage: null,
        // wiki: null

    server = new ComicsAPI();

    componentDidMount() {
        this.updateChar()
    }

    // componentWillUnmount() {
    //     console.log('unmount Random char')
    // }

    charLoaded = (char) => {
        // this.setState({char: char})
        this.setState({char, isLoading: false})
    }

    errorCatched = () => {
        this.setState({
            isLoading: false, 
            isError: true
        })
    }

    updateChar = () => {
        this.setState({
            isLoading: true, 
            isError: false
        })
        // const id = 1011005
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        // console.log(this.server.getCharacter(id))
        this.server
            .getCharacter(id)
            .then(this.charLoaded)
            .catch(this.errorCatched)
            // .then(res => {
            //     this.setState(res)
            // })
    }

    render() {
        // const { name, description, thumbnail, homepage, wiki } = this.state.char;
        // const {char: {name, description, thumbnail, homepage, wiki}, isLoading} = this.state;
        const {char, isLoading, isError} = this.state;
        const errorMessage = isError ? <Error/> : null;
        const spinner = isLoading && <Preloader/>;
        const content = !(isLoading || isError) && <ViewRandomChar char={char}/>;
       
        return (
            <div className="randomchar">
                {/* {isLoading ? <Preloader/> : <ViewRandomChar char={char}/>}   */}
                {errorMessage}{spinner}{content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

// const ViewRandomChar = (props) => {    
//     const {name, description, thumbnail, homepage, wiki} = props.char
const ViewRandomChar = ({char}) => {    
    const {name, description, thumbnail, homepage, wiki} = char
    const notFoundImgLink = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    // const isObjectFit = ;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={(thumbnail === notFoundImgLink) ? {objectFit: 'contain'} : {objectFit: 'cover'}} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;