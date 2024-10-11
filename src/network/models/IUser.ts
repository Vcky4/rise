export default interface IUser {
  id: string;
  email_address: string;
  first_name: string;
  last_name: string;
  username: string | null;
  iat: number;
  exp: number;
  total_balance: number;
  total_returns: number;
}