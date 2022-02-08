import './charList.scss';
import { useState, useEffect } from 'react';
import useComicsAPI from '../../api/ComicsAPI';
import Preloader from '../spinner/Preloader';
import { Error } from '../error/Error';

const CharList = (props) => {
    const {isError, isLoading, getAllCharacters, clearError} = useComicsAPI();

    const [chars, setChars] = useState([]);
    const [isNewCharsLoading, setIsNewCharsLoading] = useState(false)
    const [offset, setOffset] = useState(395);
    const [charsEnded, setCharsEnded] = useState(false);

    // useEffect запускается после рендера, поэтому стрелочная onRequest() сможет запуститься, хотя в коде объявлена дальше
    useEffect(() => {
        onRequest(offset, true)
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log('rerender')
    })

    const onRequest = (offset, initial) => {
        clearError();
        initial ? setIsNewCharsLoading(false) : setIsNewCharsLoading(true)
        getAllCharacters(offset)
            .then(addedChars)
    }

    const addedChars = (res) => {

        let ended = false;
        if (res.length < 9) {
            ended = true
        }
        setChars(chars => [...chars, ...res])

        setIsNewCharsLoading(false)
        setOffset(offset => offset + 9)
        setCharsEnded(ended)
    }


    const { charId } = props
    const notFoundImgLink = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const charArray = chars.map(el => {
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
    const loading = isLoading && !isNewCharsLoading && <Preloader />
    const error = isError && <Error />

    if (isLoading) {
        // динамический импорт всегда возвращает promise с объектом загружаемого модуля
        import('./someDynImportFunc')
            // если экспорт именованный, мы обращаемся к имени функции
            // .then(obj => obj.logger())
            // если экспорт дефолтный, мы обращаемся к дефолту
            .then(obj => obj.default())
            .catch(console.log('dynamic import is fail'))
    }

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