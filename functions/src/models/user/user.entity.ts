// TODO


export interface UserDocument {
  user_id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}
// export const UserDocument = (user_id: Number, password: string, name: string, phone: string, address: string) => ({
//   user_id,
//   password,
//   name,
//   phone,
//   address
//   });