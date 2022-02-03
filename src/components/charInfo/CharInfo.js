import './charInfo.scss';
import { Component } from 'react';
import ComicsAPI from '../../api/ComicsAPI';
import { Error } from '../error/Error';
import Preloader from '../spinner/Preloader';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state = {
        char: null,
        isLoading: true,
        isError: false,
    }

    server = new ComicsAPI();

    updateChar = () => {
        this.setState({
            isLoading: false,
            isError: false
        })
        const id = this.props.charId
        // останавливаем функцию, если нет id
        if (!id) { return }
        this.server
            .getCharacter(id)
            .then(this.charLoaded)
            .catch(this.errorCatched)

        // handmade error
        // this.foo.bar = 0
    }

    charLoaded = (char) => {
        this.setState({
            // (char: char)
            char,
            isLoading: false
        })
    }

    errorCatched = () => {
        this.setState({
            isLoading: false,
            isError: true
        })
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    // componentDidCatch(err, info) {
    //     console.log(err, info)
    //     this.setState({isError: true})
    // } устаревший метод, с версии >16 нужно использовать класс предохранитель



    render() {
        const { char, isLoading, isError } = this.state;

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
                {comics.length === 0 && <EmptyComics/>}
                {
                    comics.map((el, i) => {
                        // if (i < 10) {
                        //     return (
                        //         <li key={i} className="char__comics-item">
                        //             {el.name}
                        //         </li>
                        //     )
                        // }
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