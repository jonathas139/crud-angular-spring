export interface User {
  id: number; // Apenas o ID é obrigatório
  name?: string; // Campos opcionais
  email?: string;
}

export interface Course {
  _id?: string;
  name: string;
  category: string;
}
