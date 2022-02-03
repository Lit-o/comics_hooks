import { useState, useEffect } from 'react';
import ComicsAPI from '../../api/ComicsAPI';
import { Error } from '../error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Preloader from '../spinner/Preloader';

const RandomChar = () => {

    const [char, setChar] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const server = new ComicsAPI();

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line
    }, [])

    const charLoaded = (char) => {
        setChar(char)
        setIsLoading(false)
    }

    const errorCatched = () => {
        setIsLoading(false)
        setIsError(true)
    }

    const updateChar = () => {
        setIsLoading(true)
        setIsError(false)
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        server
            .getCharacter(id)
            .then(charLoaded)
            .catch(errorCatched)
    }

        const errorMessage = isError ? <Error/> : null;
        const spinner = isLoading && <Preloader/>;
        const content = !(isLoading || isError) && <ViewRandomChar char={char}/>;
       
        return (
            <div className="randomchar">
                {errorMessage}{spinner}{content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

const ViewRandomChar = ({char}) => {    
    const {name, description, thumbnail, homepage, wiki} = char
    const notFoundImgLink = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
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