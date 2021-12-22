import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from "react-bootstrap";
import Router, { useRouter } from 'next/router';

export default function Modal_window({ show, onHide }) {
    const router = useRouter()
    return (
        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-lg">Temps de développement</Modal.Title>
            </Modal.Header>
            <br></br>
            {router.pathname === '/planet' ?
                <span>
                    -  Partie React de la page réalisée en 2 jours<br></br>
                    -  Réalisation des graphiques et des svg en 2 jours<br></br>
                    -  Récupération / analyse des données en 1 jour<br></br>
                    -  Mise en place API en 1/2 journée<br></br>
                </span>
                :
                <span>
                    -  Partie React de la page réalisée en 4 jours<br></br>
                    -  Réalisation des graphiques et des svg en 3 jours<br></br>
                    -  Récupération / analyse des données en 2 jours<br></br>
                    -  Mise en place API en 3 jours<br></br>
                </span>
            }
        </Modal>
    );
}