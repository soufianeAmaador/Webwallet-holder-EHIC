import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionInfo } from '../models/SessionInfo';
import { VcEHICService } from '../services/vcEHIC.service';
import { CredentialObject } from '../models/CredentialResponse';
import { IssuerInfoResponse } from '../models/IssuerInfoResponse';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  active = 1;
  sessionId: string = '';
  sessionInfo = {} as SessionInfo;
  credential = {} as CredentialObject;
  credentialList: CredentialObject[] = [];

  title: string = 'My Credentials';
  issuerInfo = {} as IssuerInfoResponse;
  did = '' as string | null;

  constructor(private route: ActivatedRoute, private service: VcEHICService) {
    this.getWalletInfo();
    this.getIssuerInfo();
    this.getCredentials();
    this.route.queryParams.subscribe((params) => {
      this.sessionId = params['sessionId'];
      if (this.sessionId) {
        this.getSession(this.sessionId);
      }
    });
  }

  ngOnInit(): void {}

  changeTab() {
    if (this.active == 1) {
      this.active = 2;
      this.title = 'Credential Details';
      return;
    } else if (this.active == 2) {
      this.active = 1;
      this.title = 'My Credentials';
      return;
    } else if (this.active == 3) {
      this.active = 1;
      this.title = 'My Credentials';
      return;
    }
  }

  // Gets the wallet of the current user
  private getWalletInfo() {
    this.service.getWalletInfo().subscribe({
      next: (did) => {
        // Storing the did
        localStorage.setItem('did', did[0]);
        this.did = localStorage.getItem('did');
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {},
    });
  }

  // Accepting the credential offer
  receiveCredential() {
    // Checks the users wallet info
    if (!this.did) {
      alert("Couldn't initialize wallet!");
      return;
    } else
      this.service.continueIssuance(this.did, this.sessionId).subscribe({
        next: (data) => {},
        error: (error) => {
          alert(error);
        },
        complete: () => {
          // Refresh credential list
          this.getCredentials();
          // Go back to overview
          this.changeTab();
        },
      });
  }

  // Receives incoming credential request offer and prompts if the user accepts
  getSession(sessionId: string) {
    this.service.getSession(sessionId).subscribe({
      next: (data) => {
        this.sessionInfo = data;
        this.title = 'Received Credential';
        this.active = 3;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {},
    });
  }

  // Get information about the issuer
  getIssuerInfo() {
    this.service.getIssuer().subscribe({
      next: (data) => {
        this.issuerInfo = data;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {},
    });
  }

  // Get all the credentials that are in the wallet of the current holder
  getCredentials() {
    this.service.getCredentials().subscribe({
      next: (data) => {
        this.credential = data.list[0];
        this.credentialList = data.list;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        this.title = 'Credential List';
        this.active = 1;
      },
    });
  }

  declineCredential() {
    this.changeTab();
  }

  viewCredential(credential: CredentialObject) {
    this.active = 2;
    this.title = 'Credential Details';
    this.credential = credential;
  }
}
