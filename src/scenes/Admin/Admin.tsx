import React from 'react';
import { withRouter } from 'react-router-dom';
import { ThemeConsumerHook } from '../themeStore';
import { getPath } from '../../pages/routes';


const Admin = ({ history }):JSX.Element => {
    // const [{theme}, dispatch] = ThemeConsumerHook();
    
    // function handleClick() {
    //     dispatch({
    //         type: 'changeTheme',
    //         newTheme: 'blue'
    //     });
    // }

    return (
        <>
            <h1>ADMIN</h1>
            <button 
                // style={{'color': `${theme}`}}
                // onClick={handleClick}
            >
                Je veux devenir bleu !
            </button>

            <button onClick={() => history.push( getPath("admin_dashboard") )}>Tableau de bord</button>
            <button onClick={() => history.push( getPath("admin_users") )}>Utilisateurs</button>
        </>
    );
}

export default withRouter(Admin);