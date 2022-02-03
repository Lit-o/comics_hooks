import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import { useState, useEffect, useRef } from 'react';
import ComicsAPI from '../../api/ComicsAPI';
import Preloader from '../spinner/Preloader';
import { Error } from '../error/Error';

const CharList = (props) => {
    const server = new ComicsAPI();

    const [chars, setChars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNewCharsLoading, setIsNewCharsLoading] = useState(false)
    const [isError, setIsError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    // useEffect запускается после рендера, поэтому стрелочная onRequest() сможет запуститься, хотя в коде объявлена дальше
    useEffect(() => {
        onRequest()
    }, [])

    useEffect(() => {
        console.log('rerender')
    })

    const onRequest = (offset) => {
        setIsNewCharsLoading(true)
        server.getAllCharacters(offset)
            .then(addedChars)
            .catch(errorCatched)
    }

    const addedChars = (res) => {
        let ended = false;
        if (res.length < 9) {
            ended = true
        }
        setChars(chars => [...chars, ...res])
        setIsError(false)
        setIsLoading(false)
        setIsNewCharsLoading(false)
        setOffset(offset => offset + 9)
        setCharsEnded(ended)
    }

    const errorCatched = () => {
        setIsLoading(false)
        setIsError(true)
    }


    const { charId } = props
    const notFoundImgLink = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const charArray = !(isLoading || isError) && chars.map(el => {
        return (
            <li
                className={(charId === el.id) ? "char__item char__item_selected" : "char__item"}
                key={el.id}
                data-id={el.id}
                onClick={() => props.changeCharSelected(el.id)}

                onKeyDown={
                    (e) => {
                        if (e.key === 'Enter') {
                            props.changeCharSelected(el.id)
                        } else if (e.keyCode === 32 || e.key === ' ') {
                            e.preventDefault();
                            props.changeCharSelected(el.id)
                        }
                    }
                }
                tabIndex={0}
            >
                <img src={el.thumbnail} alt="abyss" style={{ objectFit: (el.thumbnail === notFoundImgLink) ? 'contain' : 'cover' }} />
                <div className="char__name">{el.name}</div>
            </li>
        )
    });
    const loading = isLoading && <Preloader />
    const error = isError && <Error />


    return (
        <div className="char__list">
            {loading}
            {error}
            <ul className="char__grid" >
                {charArray}
            </ul>
            <button
                className="button button__main button__long"
                disabled={isNewCharsLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charsEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}




export default CharList;