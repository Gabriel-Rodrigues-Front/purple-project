import React from 'react'

import styles from './ModalConsulta.module.css'

const ModalConsulta = ({setShowModalConsulta}) => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const baseUrl = `http://localhost:3001/auth/${myParam}`
    const [user, setUser] = React.useState(null);
    

    async function getUser() {
        const response = await fetch(baseUrl);
        console.log(response);
        const json = await response.json();
        setUser(json.user)
       
    }

    console.log(user)
    React.useEffect ( () => {
        getUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if( user === null) return null

    else
    return (

        <div className={styles.modal}>
            <div className={styles.caixaFlutuante}>
              <div className={styles.caixaDados}>
                  <h1 className={styles.classificacaoDado}>Dados Pessoais </h1>

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

                  <div className={`${styles.dados}  ${styles.capitalize}`}>
                  <h1 className={styles.label}>Nacionalidade:</h1>
                  <p className={styles.dado}> {user.nacionalidade} </p>
                  </div>

                  <h1 className={styles.classificacaoDado}>Endereço </h1>

                  <div className={`${styles.dados}  ${styles.capitalize}`}>
                  <h1 className={styles.label}>Estado:</h1>
                  <p className={styles.dado}>{user.estado.toUpperCase()}</p>
                  </div>

                  <div className={`${styles.dados}  ${styles.capitalize}`}>
                  <h1 className={styles.label}>Cidade:</h1>
                  <p className={styles.dado}>{user.cidade}</p>
                  </div>

                  <div className={styles.dados}>
                  <h1 className={styles.label}>CEP:</h1>
                  <p className={styles.dado}>{user.cep}</p>
                  </div>

                  <div className={`${styles.dados}  ${styles.capitalize}`}>
                  <h1 className={styles.label}>Rua:</h1>
                  <p className={styles.dado}>{user.rua}</p>
                  </div>

                  <div className={styles.dados}>
                  <h1 className={styles.label}>Número:</h1>
                  <p className={styles.dado}>{user.numero}</p>
                  </div>

                  <h1 className={styles.classificacaoDado}>Informações de Contato</h1>

                  <div className={styles.dados}>
                  <h1 className={styles.label}>Email:</h1>
                  <p className={styles.dado}>{user.email}</p>
                  </div>

                  <div className={styles.dados}>
                  <h1 className={styles.label}>Telefone:</h1>
                  <p className={styles.dado}>{user.telefone}</p>
                  </div>
              </div>
             <button onClick={() => setShowModalConsulta(false)}  className={styles.modalButton}>Fechar</button>
            </div>
        </div>
    )
}


export default ModalConsulta