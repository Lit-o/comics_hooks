import {useHttp} from '../hooks/http.hook'

const useComicsAPI = () => {
    const {isError, isLoading, request, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=398655cdc1734b6cf20b524ab0453ef7';
    const groupUrl = 'characters';    
    const _limit = 9;
    const _offset = 210;

    // getResource = async (url) => {
    //     let res = await fetch(url);
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status - ${res.status}`);
    //     }
    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _offset) => {
        const res = await request(`${_apiBase}characters?limit=${_limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharData);
    }

    const getCharacter = async (id) => {
        const res = await request(_apiBase + groupUrl + '/' + id + '?' + _apiKey);
        return _transformCharData(res.data.results[0]);
    }

    const _transformCharData = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.description || 'information is classified',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {isError, isLoading, getAllCharacters, getCharacter, clearError}
}

export default useComicsAPI;