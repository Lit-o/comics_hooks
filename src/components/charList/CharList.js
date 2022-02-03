import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import React, { Component } from 'react';
import ComicsAPI from '../../api/ComicsAPI';
import Preloader from '../spinner/Preloader';
import { Error } from '../error/Error';

class CharList extends Component {    
    state = {
        chars: [],
        isLoading: true,
        isNewCharsLoading: false,
        isError: false,
        offset: 210,
        charsEnded: false        
    }

    server = new ComicsAPI();

    componentDidMount() {
        // this.setState({isLoading: true})
        // this.server.getAllCharacters()
        //     .then(this.addedChars) 
        //     .catch(this.errorCatched)
        this.onRequest();
        // this.myRef.current.focus();        
    }
    
    // myRef = React.createRef();
    setRef = elem => {
        this.myRefFromFunc = elem
    }

    // itemRefs = [];
    // setRefArr = (ref) => {
    //     this.itemRefs.push(ref);
    // }

    componentDidUpdate(prevProps, prevState) {        
        if (this.myRefFromFunc) {
            this.myRefFromFunc.focus();
        }
    }

    onRequest = (offset) => {
        this.setState({isNewCharsLoading: true})
        this.server.getAllCharacters(offset)
            .then(this.addedChars)
            .catch(this.errorCatched)
    }

    addedChars = (res) => {
        // const newArray = res.map(res => ({
        //     name: res.name,
        //     thumbnail: res.thumbnail,
        //     id: res.id
        // }))
        let ended = false;
        if (res.length < 9) {
            ended = true
        }

        this.setState(({chars, offset}) => ({
            chars: [...chars, ...res],
            isError: false,
            isLoading: false,
            isNewCharsLoading: false,
            offset: offset + 9,
            charsEnded: ended
        }))
    }
    
    errorCatched = () => {
        this.setState({
            isLoading: false, 
            isError: true
        })
    }

    // onCharSelected = (e) => {
    //     this.props.changeCharSelected(e.currentTarget.getAttribute("data-id"))
    // }


    onKeysDown = (e) => {
        if (e.key === 'Enter') {
            this.props.changeCharSelected(+(e.currentTarget.getAttribute('data-id')))
          } else if (e.keyCode === 32) {
              e.preventDefault();
                this.props.changeCharSelected(+(e.currentTarget.getAttribute('data-id')))
          }
    }

    render() {
        const {chars, isLoading, isError, isNewCharsLoading, offset, charsEnded} = this.state
        const {charId} = this.props
        const notFoundImgLink = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
        const charArray = !(isLoading || isError) && chars.map(el => {
            return (
                <li 
                    ref={(charId === el.id) && this.setRef}
                    className={(charId === el.id) ? "char__item char__item_selected" : "char__item" }
                    key={el.id} 
                    data-id={el.id} 
                    onClick={() => this.props.changeCharSelected(el.id)}

                    onKeyDown={
                        (e) => {
                            if (e.key === 'Enter') {
                                this.props.changeCharSelected(el.id)
                              } else if (e.keyCode === 32 || e.key=== ' ') {
                                  e.preventDefault();
                                    this.props.changeCharSelected(el.id)
                              }
                        }
                    }
                    tabIndex={0}
                    >
                    {/* <img src={el.thumbnail} alt="abyss" style={(el.thumbnail === notFoundImgLink) ? {objectFit: 'contain'} : {objectFit: 'cover'}}/> */}
                    <img src={el.thumbnail} alt="abyss" style={{objectFit: (el.thumbnail === notFoundImgLink) ? 'contain' : 'cover'}}/>
                <div className="char__name">{el.name}</div>
            </li>   
            )
        });
        const loading = isLoading && <Preloader/>
        const error = isError && <Error/>
        

        return (
            <div className="char__list">
                {loading}
                {error}
                <ul className="char__grid" >                    
                    {charArray}
                </ul>
                <button 
                // tabindex='0'
                    className="button button__main button__long"
                    disabled={isNewCharsLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{display: charsEnded ? 'none' : 'block'}}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    } 
}



export default CharList;