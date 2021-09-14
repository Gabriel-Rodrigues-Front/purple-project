import { NavLink } from "react-router-dom"
import styles from './NavButton.module.css'


const NavButton = ({to, children, end}) => {


    return (

        <NavLink className={styles.navButton} end={end} to={to}>{children}</NavLink>
    )
}


export default NavButton