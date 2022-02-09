import {useState, useEffect} from 'react';
import useComicsAPI from '../../api/ComicsAPI';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import Preloader from '../spinner/Preloader';
import { Error } from '../error/Error';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(110);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {isLoading, isError, getAllComics, clearError} = useComicsAPI();

    useEffect(() => {
        onRequest(offset);
    // eslint-disable-next-line
    }, [])

    const onRequest = (offset) => {
        clearError()
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems (arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = isError ? <Error/> : null;
    const spinner = isLoading  ? <Preloader/> : null;

    return (
        <div className="comics__list">            
            {items}
            {spinner}
            {errorMessage}
            <button 
                disabled={isLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset, false, isError)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;