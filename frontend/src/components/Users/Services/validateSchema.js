import * as Yup from 'yup'



export default Yup.object().shape({
    nome: Yup.string().min(2, "Mínimo 2 caractéres").required("Este campo é obrigatório"),
    email: Yup.string().email("Insira um email válido").required("O Email é obrigatório"),
    sobrenome: Yup.string().min(2, "Mínimo 2 caractéres").required("Este campo é obrigatório"),
    nacionalidade: Yup.string().min(2, "Mínimo 2 caractéres").required("Este campo é obrigatório"),
    cep: Yup.string().matches(/^\d{5}-?\d{3}$/, "Digite um CEP válido.").required("Este campo é obrigatório"),
    estado: Yup.string().max(2, "No máximo 2 caractéres, ex: SP ").min(2, "No mínimo 2 caractéres, ex: SP").required("Este campo é obrigatório"),
    cidade: Yup.string().min(2, "Mínimo 2 caractéres").required("Este campo é obrigatório"),
    rua: Yup.string().min(1, "Mínimo 1 caractéres").required("Este campo é obrigatório"),
    numero: Yup.string().min(1, "Mínimo 1 caractéres").required("Este campo é obrigatório"),
    cpf: Yup.string().required("O CPF é obrigatório").test("Valida CPF", "CPF Inválido", function isValidCPF(cpf) {
        if (typeof cpf !== "string") return false
        cpf = cpf.replace(/[\s.-]*/igm, '')
        if (
            !cpf ||
            cpf.length !== 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" ||
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999" 
        ) {
            return false
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto === 10) || (resto === 11))  resto = 0
        if (resto !== parseInt(cpf.substring(9, 10)) ) return false
        soma = 0
        // eslint-disable-next-line no-redeclare
        for (var i = 1; i <= 10; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto === 10) || (resto === 11))  resto = 0
        if (resto !== parseInt(cpf.substring(10, 11) ) ) return false
        return true
    }),
    telefone: Yup.string().required("Este campo é obrigatório"),
})