import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './Login.css';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export const check_login = async (): Promise<boolean> => {
  const dataTempty = {} as dataT[]
  let token = document.cookie.split('=')[1]
  let headers = { "Content-Type": "application/json; charset=UTF-8" };
  if (token) {
    headers["authorization"] = `Token=${token}`;
  }
  // const dataTempty = {} as dataT[]
  // const response = await fetch("http://68.183.74.150:8080/check_login", {
    const response = await fetch("http://localhost:8080/check_login", {

    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: null,

    // Adding headers to the request
    headers: headers
  })
  return new Promise((successCallback, failureCallback) => {
    if (response.ok) {

      console.log(response);

      successCallback(true)

    } else {
      // console.log("pas ok");
      failureCallback(false)
    }
  })

}

import { dataT } from '../types/interface'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';

export const fetch_enregistrement_token = async ({ username, password }): Promise<[string, string] | boolean> => {

  let headers = { "Content-Type": "application/json; charset=UTF-8" };
  const response = await fetch("http://localhost:8080/login", {

    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify({
      nom: username,
      mdp: password
    }),

    // Adding headers to the request
    headers: headers
  })
  const responseData = await response.json();
  return new Promise((successCallback, failureCallback) => {
    if (response.ok) {
      var dictOfResponseData: any = {}
      for (const [key, value] of Object.entries(responseData)) {
        dictOfResponseData[key] = value
      }
      if (dictOfResponseData['token']!=""){
        document.cookie = `token=${dictOfResponseData['token']}`
      }
      
      // récupération du nom d'utilisateur de la personne
      successCallback([dictOfResponseData['status'], dictOfResponseData['username']])

    } else {
      alert(JSON.stringify(responseData))
      console.log("fail", responseData)
      failureCallback(false)
    }
  })
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState(false);


  useEffect(() => {
    if (document.cookie && !log) {
      check_login().then(statut => {
        setLog(statut)
      });
    }
  }
  )

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await fetch_enregistrement_token({
      username,
      password
    });
    if (Array.isArray(token)) {
      if (token[0] === "erreur bdd") {
        setMsg("Erreur bdd")
      } else if (token[0] === "erreur mdp") {
        setMsg("Erreur Log")
      } else {
        setMsg("")
        setLog(token[1]);
      }
    }
  }
  return (
    <div style={{ color: "black" }} className="login-wrapper">
      {!log ?
        <form onSubmit={handleSubmit}>
          Enregistrez vous avec les identifiants admin/admin ou user/user pour vous logger
          {msg ? <p style={{ color: "red" }}>
            {msg}
          </p> : <></>}
          <div  >
            <div style={{ display: 'inline' }} >
              <label>
                <p className="mb-1" >Nom</p>
                <input type="text" defaultValue="admin" onChange={e => setUserName(e.target.value)} />
              </label>
              <span style={{ width: "20px" }}></span>
              <label>
                <p className="mb-1" color="white">Mdp</p>
                <input type="password" defaultValue="admin" onChange={e => setPassword(e.target.value)} />
              </label>

              <div>
                <button className="mb-2 mt-2" type="submit">Submit</button>
              </div>
            </div >
          </div>
        </form>
        :
        <>Vous êtes enregistré comme étant {log}</>}
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}