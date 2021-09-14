import styles from './Home.module.css'
import {ReactComponent as HtmlIcon} from './assets/html5.svg'
import {ReactComponent as CssIcon} from './assets/css3.svg'
import {ReactComponent as JsIcon} from './assets/javascript.svg'
import {ReactComponent as MongoIcon} from './assets/mongodb.svg'
import ReactIcon from './assets/react.png';
import NodeIcon from './assets/nodeicon.png'
import ExpressIcon from './assets/expressicon.png'

const Home = () => {


    return (

        <section className={styles.section}>
            <div className={styles.conteudo}>
              <h1 className={styles.titulo}>CRUD React + NodeJS </h1>
              <div className={styles.stacks}>
               <div className={styles.stack}>
                  <h1>Front End:</h1>
                  <div className={styles.iconsStack}>
                    <div className={styles.divIcon}>
                        <HtmlIcon/>
                         <p>HTML5</p>
                    </div>
                    <div className={styles.divIcon}>
                        <CssIcon/>
                         <p>CSS3</p>
                    </div>
                    <div className={styles.divIcon}>
                        <JsIcon/>
                         <p>JavaScript</p>
                    </div>
                    <div className={styles.divIcon}>
                        <img src={ReactIcon} alt="icone do React" height="56"/>
                         <p>React</p>
                    </div>
                  </div>    
               </div> 
               <div className={styles.stack}>
                   <h1>Back End:</h1>
                   <div className={styles.iconsStack}>
                    <div className={styles.divIcon}>
                        <MongoIcon/>
                         <p>MongoDB</p>
                    </div>
                    <div className={styles.divIcon}>
                         <img src={NodeIcon} alt="logo node.js"  height="55"/>
                         <p>NodeJS</p>
                    </div>
                    <div className={styles.divIcon}>
                        <img src={ExpressIcon} alt="logo Express.js" />
                         <p>ExpressJS</p>
                    </div>
                  </div>  
               </div>
            </div>
            </div>
            
        </section>
    )
}

export default Home;