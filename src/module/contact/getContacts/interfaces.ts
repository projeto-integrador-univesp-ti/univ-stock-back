interface GetContactsRequest {}

interface GetContactsResponse {
  data: Contact[]
 }

type Contact = {
  id: string;
  nome: string;
  id_tipo_contato: string;
};

export { GetContactsRequest, GetContactsResponse, Contact };
