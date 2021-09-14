import React from 'react'
import styles from './Listar.module.css'
import {ReactComponent as LupaIcon} from '../../../assets/lupa.svg'
import {ReactComponent as AlterarIcon} from '../../../assets/alterar.svg'
import {ReactComponent as ExcluirIcon} from '../../../assets/excluir.svg'
import {Link} from 'react-router-dom'
import ModalConsulta from './ModalConsulta'
import ModalDelete from './ModalDelete'
import Pagination from './Pagination'

const Listar = () => {
    const size = 9;
    const [offset, setOffset] = React.useState(1);
    const [totalUsers, setTotalUsers] = React.useState(0)
    const [users, setUsers] = React.useState(null);
    const [search, setSearch] = React.useState('')

    const [showModalConsulta, setShowModalConsulta] = React.useState(false);
    const [showModalDelete, setShowModalDelete] = React.useState(false);

    const url = `http://localhost:3001/auth/?cpf=${search}&page=${offset}&size=${size}`
    async function getUsers () {

      try {
        const response = await fetch(url);
        const json = await response.json();
        setUsers(json.users);
        setTotalUsers(json.meta.count)
      } catch (error) {
        console.log(error)
      }
        
    }

    function pesquisar (event) {
       event.preventDefault()
       const searchInput = document.getElementById('searchInput')
       const valueSearch = searchInput.value
       setSearch(valueSearch)

       if(search !== "")
       setOffset(1)
    }

    

    React.useEffect( () => {
       
        getUsers()
     }, [offset, search, showModalDelete]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <div className={styles.caixa}>
          <form onSubmit={ (event) => pesquisar(event)} className={styles.divBarraPesquisa}>
             <LupaIcon className={styles.lupaIcon}/>
            <input id={'searchInput'} placeholder="Procure pelo CPF no formato padrão, ex: 123.456.789-10"   className={styles.inputPesquisa}/>
          </form> 

          {/* INICIO DA TABLE DESKTOP */}
          <table className={styles.tableDesktop}>
            <thead className={styles.thead}>
              <tr className={styles.trDesktop}>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>CPF</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className={styles.tbodyDesktop}>
                {users !== null ? users.map( (user) => (
                    <tr key={user._id}>
                    <td>{user.nome}</td>
                    <td>{user.sobrenome}</td>
                    <td>{user.cpf}</td>
                    <td>
                        <div className={styles.divButtons}>
                            <Link onClick={ () => setShowModalConsulta(true)} to={`?id=${user._id}`} className={styles.buttonLupa}><LupaIcon/></Link>
                            <Link to={`/Users/Listar/Alterar?id=${user._id}`} className={styles.buttonAlterar}><AlterarIcon/></Link>
                            <Link onClick={ () => setShowModalDelete(true)} to={`?id=${user._id}`} className={styles.buttonExcluir}><ExcluirIcon/></Link>
                        </div>
                    </td>
                </tr>
                ) ) : null}
            </tbody>
          </table>
          {/* FIM DA TABLE DESKTOP */}

          {/* INICIO LISTAGEM MOBILE */}

          {users !== null ? users.map ( (user ) => (
            <div key={user._id} className={styles.listagemUserMobile}>
            <div className={styles.caixaUserMobile}>
              <div className={styles.userMobileDados}>
                <h1>Nome:</h1>
                <h1>{user.nome}</h1>
              </div>
              <div className={styles.userMobileDados}>
                <h1>Sobrenome:</h1>
                <h1>{user.sobrenome}</h1>
              </div>
              <div className={styles.userMobileDados}>
                <h1>CPF:</h1>
                <h1>{user.cpf}</h1>
              </div>
              <div className={styles.userMobileDados}>
                <h1>Ações:</h1>
                <Link onClick={ () => setShowModalConsulta(true)} to={`?id=${user._id}`} className={styles.buttonLupa}><LupaIcon/></Link>
                <Link to={`/Users/Listar/Alterar?id=${user._id}`} className={styles.buttonAlterar}><AlterarIcon/></Link>
                <Link onClick={ () => setShowModalDelete(true)} to={`?id=${user._id}`} className={styles.buttonExcluir}><ExcluirIcon/></Link>
              </div>
            </div>
          </div>       
          )) : null}
          
          
          {/* FIM DA LISTAGEM MOBILE */}
               {users === null ? 
              <h1 style={{color:'#fff', fontWeight:"200", marginTop:"20px"}}>
                Nenhum dado retornado, cadastre uma pessoa ou verifique se iniciou o backend.
              </h1> 
              : null}
              {search !== '' ? null : <Pagination limit={size} total={totalUsers} offset={offset} setOffset={setOffset} /> }
        </div>
          {showModalConsulta === true ? <ModalConsulta setShowModalConsulta={setShowModalConsulta}/> : null}
          {showModalDelete === true ? <ModalDelete setShowModalDelete={setShowModalDelete}/> : null}
          </>
        
    )
}

export default Listar;
