export default interface UserInterface {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  role: string;
}
