import React from 'react'
import styles from './ModalSuccess.module.css'

const Modal = ({setShowModal}) => {

    function closeModal() {

        setShowModal(false)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.caixaFlutuante}>
                <h1 className={styles.h1}>Cadastro realizado com sucesso !</h1>
                <p className={styles.mensagem}>Você pode consulta-lo na sessão de listagem, clicando no botão consultar.</p>
            <button className={styles.modalButton} onClick={closeModal}>Fechar</button>
            </div>
        </div>
    )
}

export default Modal;