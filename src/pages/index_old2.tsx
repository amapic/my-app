import React, { useEffect, useState } from "react";


const chercheData = async (url: string): Promise<any> => {

    const response = await fetch(url, { mode: 'cors' });
    const responseData = await response.json();

    if (response.ok) {
        return responseData

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}
const App = () => {
    const [items, setItems] = useState<any>(null)
    useEffect(() => {
        chercheData('https://gorest.co.in/public/v1/users').then((tt) =>
            setItems(tt.data));
    }

        , [])


    // const [error, range] = useFetch('https://gorest.co.in/public/v1/users')
    // const { data: quote, loading, error } = useFetch('https://gorest.co.in/public/v1/users')

    if (items) {
        return (
            <>
                <ul>
                    {items.map((entry: Object, index: number) => (
                        <li>{entry.name}</li>
                    ))}
                </ul>
            </>
        )
    }

    return null
};

export default App;