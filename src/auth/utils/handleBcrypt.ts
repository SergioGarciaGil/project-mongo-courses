import * as bcryptjs from "bcryptjs";

//le aplica cierta cantidad de aleatoriedad a tu hash
const saltRound = 10
// convertir un texto plano a un encriptado
const encrypt = async (passwordPlain: string) => {
    const hash = await bcryptjs.hash(passwordPlain, saltRound)
    return hash//aqui nos llega cadena de texto
}

const compare = async (passwordPlain: string, hashPassword: string) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

export { encrypt, compare }