import styles from './header.module.css'
import {ReactComponent as Linkedin} from './assets/linkedin.svg'
import {ReactComponent as Github} from './assets/gitHub.svg'
import {ReactComponent as Behance} from './assets/behance.svg'
import {ReactComponent as Homeicon} from './assets/homeicon.svg'
import {ReactComponent as Usericon} from './assets/usersicon.svg'
import { NavLink } from 'react-router-dom'

const header = () => {


    return (

        <header className={styles.header}>
            <nav>
            <ul>
                <li>
                <NavLink className={styles.navButton} to="/" end>
                    <Homeicon/><h2 className={styles.navLink}>Home</h2>
                </NavLink>
                </li>
                <li>
                <NavLink className={styles.navButton} to="/Users">
                    <Usericon/><h2 className={styles.navLink}>Usuários</h2>
                </NavLink>
                </li>
            </ul>
            </nav>
            <div className={styles.rodapeMenuLateral}>
                <div className={styles.conteudo}>
                  <p>Desenvolvido por<br></br>Gabriel Rodrigues</p>
                  <div className={styles.icons}>
                      <a href="https://www.linkedin.com/in/gabriel-rodrigues-92a17b204/"> <Linkedin/></a>
                      <a href="https://github.com/Gabriel-Rodrigues-Front"> <Github/> </a> 
                      <a href="https://www.behance.net/gabrielrodrigu347"><Behance/></a>
                  </div>
                </div>
            </div>
        </header>
    )
}

export default header;