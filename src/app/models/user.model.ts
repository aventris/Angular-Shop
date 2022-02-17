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
      longstring: string;
    };
  };
  phone: string;
}
