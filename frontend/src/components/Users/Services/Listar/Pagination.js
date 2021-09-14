import React from 'react';
import styles from './Pagination.module.css'





const Pagination = ({limit, total, offset, setOffset}) => {
    const totalPages = Math.ceil(total / limit );


   

return (
    <ul className={styles.pagination}>

        
         <button disabled={offset === 1} className={styles.buttonNextPrevius} onClick={() => setOffset(offset -1)}>Anterior</button>
            <div className={styles.pages}><p>Página </p> <p>{offset} de {totalPages}</p></div>
             <button disabled={offset === totalPages}className={styles.buttonNextPrevius} onClick={() => setOffset(offset + 1)}>Próxima</button>
    </ul>
)

}

export default Pagination;