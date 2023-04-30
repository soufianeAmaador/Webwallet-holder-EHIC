import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './errorHandler.service';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from '../models/LoginResponse';
import { SessionInfo } from '../models/SessionInfo';
import { CredentialResponse } from '../models/CredentialResponse';
import { IssuerInfoResponse } from '../models/IssuerInfoResponse';

@Injectable({
  providedIn: 'root',
})
export class VcEHICService {
  private static readonly LOCALHOST: String = 'http://localhost:8080';
  private errorHandlerService: ErrorHandlerService = new ErrorHandlerService();
  private _auth_token: string = '';

  constructor(private _httpClient: HttpClient) {}

  set auth_token(value: string) {
    this._auth_token = value;
  }

  logIn(username: string, password: string): Observable<LoginResponse> {
    return this._httpClient
      .post<LoginResponse>(
        VcEHICService.LOCALHOST.concat('/api/auth/login'),
        { id: username, password: password },
        { observe: 'body' }
      )
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  // Gets the DID's in the possession of the current custodian
  getWalletInfo(): Observable<string[]> {
    return this._httpClient
      .get<string[]>(VcEHICService.LOCALHOST.concat('/api/wallet/did/list'), {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  // Gets the current Issuer and the metadata
  getIssuer(): Observable<IssuerInfoResponse> {
    return this._httpClient
      .get<IssuerInfoResponse>(
        VcEHICService.LOCALHOST.concat('/api/wallet/issuer/metadata'),
        {
          params: { issuerId: 'waltid' },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          observe: 'body',
          responseType: 'json',
        }
      )
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  // Lists all credential IDs the custodian knows of
  getCredentials(): Observable<CredentialResponse> {
    return this._httpClient
      .get<CredentialResponse>(
        VcEHICService.LOCALHOST.concat('/api/wallet/credentials/list'),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  // Returns the request/offer information about the current session
  getSession(sessionId: string): Observable<SessionInfo> {
    return this._httpClient
      .get<SessionInfo>(
        VcEHICService.LOCALHOST.concat('/api/wallet/issuance/info'),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { sessionId: sessionId },
        }
      )
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  // Continues the issuance request after the custodian accepted the credential offer
  continueIssuance(did: string, sessionId: string): Observable<JSON> {
    console.log('continue session ID');
    return this._httpClient
      .get<JSON>(
        VcEHICService.LOCALHOST.concat(
          '/api/wallet/issuance/continueIssuerInitiatedIssuance'
        ),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { did: did, sessionId: sessionId },
          observe: 'body',
          responseType: 'text' as 'json',
        }
      )
      .pipe(catchError(this.errorHandlerService.handleError));
  }
}
