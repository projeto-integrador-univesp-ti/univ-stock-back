interface AddContactTypeRequest {
  nome: string;
}

interface AddContactTypeResponse { }

type ContactType = {
  id: string;
  nome: string;
};

export { AddContactTypeRequest, AddContactTypeResponse, ContactType };
