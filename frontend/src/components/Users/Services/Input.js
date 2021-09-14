import styles from './Input.module.css'
import {useField} from 'formik'
import React from 'react'
import InputMasked from 'react-input-mask'



const Input = ({label, ...props}) => {
    const [inputProps, meta] = useField(props)
    const id = props.id || props.name

    
   
    return (

        <div className={styles.inputDiv}>
        {label && <label className={styles.label} htmlFor={id}>{label}</label>}
        <InputMasked  {...inputProps} {...props} id={id} className={`${styles.inputRegister} ${meta.error && meta.touched && (styles.errorBorder)} `}/>
        {meta.error && meta.touched &&  (
            <div className={styles.errorStyle}> {meta.error.toString()} </div>
        )}
        </div>
       
       
    )
}


export default Input