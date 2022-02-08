import {Link} from 'react-router-dom'

const NotFound = () => {
    return(
        <><h1>Not found</h1><Link to="/" style={{textDecoration: "underline", paddingTop: 20}}>Go to main page</Link></>
    )
}

export default NotFound;