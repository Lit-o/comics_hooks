import {Link, NavLink} from 'react-router-dom'
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    {/* Router 5.3.0 */}
                    <li><NavLink exact activeStyle={{color: '#9F0010'}} to="/">Characters</NavLink></li>
                    / 
                    <li><NavLink exact activeStyle={{color: '#9F0010'}} to="/comics">Comics</NavLink></li>

                    {/* Router 6.2.1
                    npm i react-router-dom@6.2.1 --save

                    <li><NavLink end 
                    style={({isActive}) => ({color: isActive ? '#9F0010' : 'inherit'})}
                    to="/">Characters</NavLink></li>
                    / 
                    <li><NavLink end 
                    style={({isActive}) => ({color: isActive && '#9F0010'})}
                    className={({isActive}) => "naw-link" + (isActivated ? " activated" : "")}
                    to="/comics">Comics</NavLink></li> */}
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;