import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ModalSucessoAlteracao.module.css'

const Modal = () => {


    return (
        <div className={styles.modal}>
            <div className={styles.caixaFlutuante}>
                <h1 className={styles.h1}>Alteração realizada com sucesso!</h1>
                <p className={styles.mensagem}>Você pode consulta-lo na sessão de listagem.</p>
            <Link className={styles.modalButton} to="/Users/Listar">Fechar</Link>
            </div>
        </div>
    )
}

export default Modal;