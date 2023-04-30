export interface Credential {
  type: string[];
  '@context': string[];
  id: string;
  issuer: string;
  issuanceDate: string;
  issued: string;
  validFrom: string;
  credentialSubject: {
    id: string;
    address: {
      addressType: string;
      country: string;
      houseNumber: string;
      municipality: string;
      postcode: string;
      residence: string;
      street: string;
    };
    bankDetails: {
      accountNumber: string;
      bankCode: string;
      bankName: string;
    };
    dateOfBirth: string;
    expiryDate: string;
    givenNames: string;
    identificationNumberOfTheCard: string;
    identificationOfTheInstitution: string;
    insurer: {
      address: {
        addressType: string;
        country: string;
        houseNumber: string;
        municipality: string;
        postcode: string;
        residence: string;
        street: string;
      };
      identificationNumber: string;
      insurance: {
        endDate: string;
        insuranceType: string;
        startDate: string;
      };
      organisationName: string;
      polisNumber: string;
      telephone: {
        numberType: string;
        phoneNumber: string;
      };
    };
    name: string;
    personalIdentificationNumber: string;
    telephone: {
      numberType: string;
      phoneNumber: string;
    };
  };
  credentialStatus: {
    id: string;
    type: string;
  };
}
