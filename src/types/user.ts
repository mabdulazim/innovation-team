type UserAddressType = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  }
}

type UserCompanyType = {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: UserAddressType;
  company: UserCompanyType;
}

export type LoginType = {
  id: string;
  password: string;
};
