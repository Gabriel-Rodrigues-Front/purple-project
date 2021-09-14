import React from 'react'

import styles from './ModalDelete.module.css'

const ModalDelete = ({setShowModalDelete}) => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const baseUrl = `http://localhost:3001/auth/${myParam}`
    const [user, setUser] = React.useState(null);
    

    async function getUser() {
        const response = await fetch(baseUrl);
        const json = await response.json();
        setUser(json.user)
       
    }

    async function deleteUser() {
        await fetch(baseUrl, {
            method: 'DELETE'
        })
        
        setShowModalDelete(false);
      
    }

    React.useEffect ( () => {
        getUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if( user === null) return null

    else
    return (

        <div className={styles.modal}>
            <div className={styles.caixaFlutuante}>
              
              <div className={styles.caixaDados}>
              <h1 className={styles.confirmacao}>Tem certeza que deseja excluir o cadastro abaixo ? </h1>
                  <div className={`${styles.dados}  ${styles.capitalize}`}>
                  <h1 className={styles.label}>Nome:</h1>
                  <p className={styles.dado}>{user.nome}</p>
                  </div>

                  <div className={`${styles.dados}  ${styles.capitalize}`}>
                  <h1 className={styles.label}>Sobrenome:</h1>
                  <p className={styles.dado}>{user.sobrenome}</p>
                  </div>

                  <div className={styles.dados}>
                  <h1 className={styles.label}>CPF:</h1>
                  <p className={styles.dado}>{user.cpf}</p>
                  </div>

              </div>
             <div className={styles.divButtons}>
             <button onClick={() => setShowModalDelete(false)}  className={styles.modalButton}>Fechar</button>
             <button onClick={deleteUser} className={styles.excluir}>Excluir</button>
             </div>
             
            </div>
        </div>
    )
}


export default ModalDelete