interface AddUserResquest {
    id: string
}

interface AddUserResponse {
    data: User
}

type User = {
    id: string
    nome: string
    dt_nascimento: string 
}

export { AddUserResquest, AddUserResponse, User };
