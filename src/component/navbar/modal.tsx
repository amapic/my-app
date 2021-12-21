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
                    -  Partie React de la page réalisée en 2 jours
                    -  Réalisation des graphiques et des svg en 2 jours
                    -  Récupération / analyse des données en 1 jour
                    -  Mise en place API en 1/2 journée
                </span>
                :
                <span>
                    -  Partie React de la page réalisée en 4 jours
                    -  Réalisation des graphiques et des svg en 3 jours
                    -  Récupération / analyse des données en 2 jours
                    -  Mise en place API en 3 jours
                </span>
            }
        </Modal>
    );
}