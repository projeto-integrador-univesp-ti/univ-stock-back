interface GetUserResquest {
    id: string
}

interface GetUserResponse {
    data: User
}

type User = {
    id: string
    nome: string
    data_nascimento: string 
}

export { GetUserResquest, GetUserResponse, User };
