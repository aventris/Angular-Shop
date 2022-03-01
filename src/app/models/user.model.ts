export interface User {
  id: number;
  email: string;
  username: string;
  password: String;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface RegisterUser extends Omit<User, 'id'> {
  firstname?: string;
  lastname?: string;
}

export interface UpdateUser extends Partial<User> {}
