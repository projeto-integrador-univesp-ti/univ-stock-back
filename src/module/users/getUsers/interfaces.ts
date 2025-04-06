interface GetUsersResquest {}

interface GetUsersResponse {
    data: User[]
}

type User = {
    id: string
    nome: string
    data_nascimento: string 
}

export { GetUsersResquest, GetUsersResponse, User };
