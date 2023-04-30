export interface BankDetails {
  accountNumber: string;
  bankCode: string;
  bankName: string;
}

export interface Address {
  addressType?: any;
  country: string;
  houseNumber: string;
  municipality?: any;
  postcode: string;
  residence: string;
  street: string;
}

export interface Insurance {
  endDate: string;
  insuranceType: string;
  startDate: string;
}

export interface Telephone {
  numberType: string;
  phoneNumber: string;
}

export interface Insurer {
  address: Address;
  identificationNumber: string;
  insurance: Insurance;
  organisationName: string;
  polisNumber: string;
  telephone: Telephone;
}

export interface CredentialSubject {
  id: string;
  address: Address;
  bankDetails: BankDetails;
  dateOfBirth: string;
  expiryDate: string;
  givenNames: string;
  identificationNumberOfTheCard: string;
  identificationOfTheInstitution: string;
  insurer: Insurer;
  name: string;
  personalIdentificationNumber: string;
  telephone: Telephone;
}

export interface CredentialStatus {
  id: string;
  type: string;
}

export interface CredentialObject {
  type: string[];
  '@context': string[];
  id: string;
  issuer: string;
  issuanceDate: Date;
  issued: Date;
  validFrom: Date;
  credentialSubject: CredentialSubject;
  credentialStatus: CredentialStatus;
}

export interface CredentialResponse {
  list: CredentialObject[];
}
