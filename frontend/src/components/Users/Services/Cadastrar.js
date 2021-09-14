import React from 'react'
import Input from "./Input"
import styles from './Cadastrar.module.css'
import {Formik, Form} from 'formik';
import schema from './validateSchema'
import Modal from './ModalSuccess.js'




const Cadastrar = () => {

const [showModal, setShowModal] = React.useState("")
const [ loading, setLoading] = React.useState(false);

const urlPost = `http://localhost:3001/auth/`

    // Caso não houver nenhum erro de validação essa função de post é executada.
  async  function onSubmit(values, actions) {
    const {
        nome,
        sobrenome,
        nacionalidade,
        estado,
        cidade,
        rua,
        numero,
        email,
        telefone,
        cpf,
        cep
    } = values

        try {
            
            setLoading(true)
            const response = await fetch(urlPost, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    sobrenome,
                    nacionalidade,
                    estado,
                    cidade,
                    rua,
                    numero,
                    email,
                    telefone,
                    cpf,
                    cep
                })

            })
            
        
            const json = await response.json()
           
            console.log(response)

            // Simular o tempo de resposta de uma api para execução do resultado da chamada.
            setTimeout( () => {
                setLoading(false)
           
            // Exibe modal de sucesso caso o cadastro seja realizado adequadamente
            if(response.status === 200) {
                setShowModal(true);
                // Limpa o formulario.
                actions.resetForm()
            }
            
            // exibe mensagem de erro de cpf já cadastrado caso o usuário tente cadastrar um cpf que já existe no bd
            if(json.error === "CPF já existe no banco de dados.") {
                actions.setFieldError('cpf', `${json.error}`)
                }
            }, 700)
            
        } catch (error) {
           console.log(error)
        }

        
    }

        // Função para auto-completar os campos de endereço com base no CEP.
   async function onBlurCep(setFieldValue, getFieldMeta) {
        
        // Verifica se há algum erro de validação no input do CEP
        if(getFieldMeta("cep").error !== (undefined) || (null)) {
            return null
        } 
        // Caso não haja erros de validação no CEP, faz o fetch em api para completar os campos de endereço.
        else {
            const cepValue = getFieldMeta("cep").value;
            const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
            const json = await response.json();
            setFieldValue("estado", json.uf);
            setFieldValue("cidade", json.localidade);
            setFieldValue("rua", json.logradouro);
        }
        
    }

   
    
    return (
        <>
         <h1 className={styles.titulo}>Cadastrar</h1>
        <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{ 
            nome: '',
            sobrenome:'',
            nacionalidade:'',
            cep:'',
            estado:'',
            cidade:'',
            rua:'',
            numero:'',
            email:'',
            cpf:'',
            telefone:'',
        }}
      >
        {({setFieldValue, getFieldMeta}) => (
            
                <Form className={styles.form} autoComplete="off">
                    <div className={styles.inputGroup}>
                        <Input type="text" label="Nome:" name="nome" placeholder="Exemplo: Gabriel"/>
                        <Input  type="text" label="Sobrenome:" name="sobrenome" placeholder="Exemplo: Silva"/>
                    </div>
                    <div className={styles.inputGroup}>
                        <Input  type="text" label="Nacionalidade:" name="nacionalidade" placeholder="Exemplo: Brasileiro"  />
                        <Input  type="text" mask="99999-999" label="CEP:" onBlur={() => onBlurCep(setFieldValue, getFieldMeta)} name="cep" placeholder="Exemplo: 12345-678"/>
                        <Input  type="text" label="UF:" name="estado" placeholder="Exemplo: SP"/>
                    </div>
                    <div className={styles.inputGroup}>
                        <Input  type="text" label="Cidade:" name="cidade" placeholder="Exemplo: São Paulo"/>
                        <Input  type="text" label="Rua:" name="rua" placeholder="Exemplo: Av. Paulista"/>
                        <Input  type="text" label="Número:" name="numero" placeholder="Exemplo: 1000"/>
                    </div>
                    <div className={styles.inputGroup}>
                        <Input  type="email" label="Email:" name="email" placeholder="Digite seu email..."/>
                        <Input  type="text" mask="999.999.999-99"  placeholder="Digite seu CPF..." label="CPF:" name="cpf"/>
                        <Input  type="text"  label="Telefone:" name="telefone" placeholder="Digite seu telefone..."/>
                    </div>
        
                    <button disabled={loading ? "disabled" : null} className={styles.formButton} type="submit">{loading ? <div className={styles.loading}></div> : "Cadastrar"}</button>
                </Form>
        )}
    </Formik>
    {showModal && <Modal setShowModal={setShowModal}/>}
    </>

      
        
       
    )
}

export default Cadastrar;