

export const Error = () => {
    return (
        <div className="" style={{textAlign: 'center'}}>
            <h2 style={{color: '#9F0013', fontWeight: 'bold', }}>Something go wrong =( Try again later</h2>
            <img src={process.env.PUBLIC_URL + '/error.gif'} alt="error" 
            style={{display: 'block', width: 210, height: 210, objectFit: 'contain', margin: '0 auto'}}/>
        </div>
    )
}