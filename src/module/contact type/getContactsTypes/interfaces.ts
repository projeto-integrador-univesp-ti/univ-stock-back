interface GetContactsTypesRequest {}

interface GetContactsTypesResponse {
  data: ContactType[]
 }

type ContactType = {
  id: string;
  nome: string;
};

export { GetContactsTypesRequest, GetContactsTypesResponse, ContactType };
