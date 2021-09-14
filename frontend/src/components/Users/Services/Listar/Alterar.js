import React from 'react'
import Input from "../Input"
import styles from './Alterar.module.css'
import {Formik, Form} from 'formik';
import schema from '..//validateSchema'
import Modal from './ModalSucessoAlteracao.js'
import { Link } from 'react-router-dom';




const Cadastrar = () => {

const urlParams = new URLSearchParams(window.location.search)
const idParam = urlParams.get('id')
console.log(idParam)

// Função para preencher o formulário com os dados do usuário 
// a ser alterado para não haver necessidade de preencher novamente.

const [data, setData] = React.useState()

const baseURL = `http://localhost:3001/auth/${idParam}`
async function fetchGetUser() {
    const response = await fetch (baseURL)
    const json = await response.json()
    setData(json.user)
}

React.useEffect( () => {
    fetchGetUser()
}, []) // eslint-disable-line react-hooks/exhaustive-deps

console.log(data)

const [showModal, setShowModal] = React.useState("")
const [ loading, setLoading] = React.useState(false);


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
            const response = await fetch(baseURL, {
                method:'PUT',
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
            console.log(json)
            // Simular o tempo de resposta de uma api para execução do resultado da chamada.
            setTimeout( () => {
                setLoading(false)
           
            // Exibe modal de sucesso caso o cadastro seja realizado adequadamente
            if(response.status === 200) {
                setShowModal(true);
            }
            

           
            if(response.status === 400) {
                actions.setFieldError('cpf', `Este CPF já está em uso.`)
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

    if(data) {
        return (
            <>
            <h1 className={styles.titulo}>Alterar Cadastro</h1>
            <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{ 
                nome: data.nome,
                sobrenome:data.sobrenome,
                nacionalidade:data.nacionalidade,
                cep:data.cep,
                estado:data.estado,
                cidade:data.cidade,
                rua:data.rua,
                numero:data.numero,
                email:data.email,
                cpf:data.cpf,
                telefone:data.telefone,
            }}
          >
            {({setFieldValue, getFieldMeta}) => (
                    <>
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

                        <div className={styles.divButtons}>
                        <Link to="/Users/Listar" className={styles.buttonCancel}> Cancelar </Link>
                        <button disabled={loading ? "disabled" : null} className={styles.formButton} type="submit">{loading ? <div className={styles.loading}></div> : "Alterar"}</button>
                        </div>
                        
                    </Form>
                    </>
            )}
        </Formik>
        {showModal && <Modal setShowModal={setShowModal}/>}
        </>
        )
    } else return null
   
}

export default Cadastrar;