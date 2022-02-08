import { useEffect } from "react"

const withLogger = WrapperComponent => props => {
    useEffect(() => {
        console.log('Wake up, Neo...')
    }, []);

    return <WrapperComponent {...props} />
}

const WakeUp = () => {
    return (
        <h1>Wake up, Neo...</h1>
    )
}

const WakeUpWithLogger = withLogger(WakeUp)