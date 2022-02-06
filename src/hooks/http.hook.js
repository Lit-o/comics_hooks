import { useCallback, useState } from "react";

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = {'Content-Type': 'application/json'} ) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {method, body, headers})
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status - ${response.status}`);
            }
            const data = await response.json()
            setIsLoading(false);
            return data
        } catch(e) {
            setIsLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {isError, isLoading, request, clearError}
}