import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

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
            
            <Router>
            <div>
              <h2>Accounts</h2>
      
                <ul>
                    {items.map((entry: Object, index: number) => {
                         let url="/" + entry.id
                        return(
                        <li>
                        <Link to={url}>{entry.name}</Link>
                        </li>
                        )
                    })}
                </ul>
      
              <Switch>
                <Route path="/:id" children={<Child />} />
              </Switch>
            </div>
          </Router >
        )
    }

return null
};

function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
  
    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
  }

export default App;