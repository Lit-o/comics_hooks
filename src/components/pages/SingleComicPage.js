import { useParams, Link } from 'react-router-dom'

import { useState, useEffect } from 'react';
import useComicsAPI from '../../api/ComicsAPI';
import { Error } from '../error/Error';
import Preloader from '../spinner/Preloader';

import './singleComicPage.scss';

const SingleComicPage = () => {

    // const comicId = useParams()
    const { comicId } = useParams()
    const [comic, setComic] = useState(null);

    const { isError, isLoading, clearError, getComic } = useComicsAPI()

    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(comicLoaded)
    }

    const comicLoaded = (comic) => {
        setComic(comic)
    }

    useEffect(() => {
        updateComic()
        // eslint-disable-next-line
    }, [comicId])

    const error = isError && <Error/>
    const preloader = isLoading && <Preloader/>
    const view = !(isError || isLoading || !comic) && <View comic={comic}/>

    return (
        <>
            {error}
            {preloader}
            {view}
        </>
    )
}

const View = ({comic}) => {
    const { title, description, pageCount, thumbnail, language, price } = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;