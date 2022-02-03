import './charInfo.scss';
import { useState, useEffect } from 'react';
import ComicsAPI from '../../api/ComicsAPI';
import { Error } from '../error/Error';
import Preloader from '../spinner/Preloader';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const server = new ComicsAPI();

    const updateChar = () => {
        setIsLoading(false)
        setIsError(false)
        const id = props.charId
        // останавливаем функцию, если нет id
        if (!id) { return }
        server
            .getCharacter(id)
            .then(charLoaded)
            .catch(errorCatched)
        // handmade error
        // this.foo.bar = 0
    }

    const charLoaded = (char) => {
        setChar(char)
        setIsLoading(false)
    }

    const errorCatched = () => {
        setIsLoading(false)
        setIsError(true)
    }

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line
    }, [props.charId])

    const skeleton = char || isError || isLoading ? null : <Skeleton />
    const errorMessage = isError ? <Error /> : null;
    const spinner = isLoading && <Preloader />;
    const content = !(isLoading || isError || !char) && <View char={char} />;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char
    const notFoundImgLink = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={(thumbnail === notFoundImgLink) ? { objectFit: 'contain' } : { objectFit: 'cover' }} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 && <EmptyComics />}
                {
                    comics.map((el, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {el.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

const EmptyComics = () => {
    return (
        <li >
            We don't have information about that
        </li>
    )
}

export default CharInfo;