import styles from './Users.module.css'
import NavButton from './Services/NavButton.js'
import { Route, Routes } from 'react-router-dom'
import Cadastrar from './Services/Cadastrar'
import Listar from './Services/Listar/Listar'
import Alterar from './Services/Listar/Alterar'


const Users = () => {


    return (

        <section className={styles.section}>
        <nav className={styles.navUsers}>
         <ul>
           <li>
             <NavButton end to="/Users">CADASTRAR</NavButton>
           </li>
           <li>
             <NavButton to="/Users/Listar">CONSULTAR</NavButton>
           </li>
         </ul>
         </nav>
         <Routes>
             <Route path="/*" element={<Cadastrar/>}/>
             <Route path="/Listar" element={<Listar/>}/>
             <Route path="/Listar/Alterar" element={<Alterar/>}/>
         </Routes>
         
        </section>
    )
}

export default Users;