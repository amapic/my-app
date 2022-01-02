
import React, { useState  } from 'react';


export default function Home ():JSX.Element {

    const [count, setCount] = React.useState(0);

    return (
        <section>

            <h3>{count}</h3>
            <span>
                <button id="count-up" type="button" onClick={() => setCount(count + 1)}>Count Up</button>
                <button id="count-down" type="button" onClick={() => setCount(count - 1)}>Count Down</button>
                <button id="zero-count" type="button" onClick={() => setCount(0)}>Zero</button>
            </span>
        </section>
    );

}