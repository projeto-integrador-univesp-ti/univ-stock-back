interface AddContactRequest {
  nome: string;
  id_tipo_contato: string;
}

interface AddContactResponse { }

type Contact = {
  id: string;
  nome: string;
  id_tipo_contato: string;
};

export { AddContactRequest, AddContactResponse, Contact };
