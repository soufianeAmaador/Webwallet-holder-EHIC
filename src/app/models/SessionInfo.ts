export interface SessionInfo {
  credentialTypes: string[];
  credentials: Credential[];
  did: string;
  id: string;
  isIssuerInitiated: boolean;
  isPreAuthorized: boolean;
  issuerId: string;
  lastTokenUpdate: {};
  nonce: string;
  opState: string;
  preAuthzCode: string;
  tokenNonce: string;
  tokens: {};
  user: {
    did: string;
    email: string;
    ethAccount: string;
    id: string;
    password: string;
    tezosAccount: string;
    token: string;
  };
  userPinRequired: boolean;
  walletRedirectUri: string;
}
