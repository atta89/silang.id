export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  access_token: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  user: User;
  access_token: string;
};

export type LogoutResponse = {
  message: string;
};

export type UserRequest = {
  name: string;
  email: string;
  password: string;
};

export type DeleteUserResponse = {
  message: string;
};
