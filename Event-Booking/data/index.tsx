import { ILoginInput, IRegisterInput } from "@/interfaces";
export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "name",
    placeholder: "Name",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
  }, // confirm password
];
export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
  },
];
