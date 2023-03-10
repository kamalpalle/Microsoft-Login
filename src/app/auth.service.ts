// import the msal library
import { Injectable } from '@angular/core';
import * as msal from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // define the msalConfig object with your Azure AD application details
  private msalConfig: msal.Configuration = {
    auth: {
      clientId: '081a4ee1-471e-4772-a894-585a64fc8a55',
      authority: `https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a`,
      redirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: 'localStorage',
    },
  };
  
  // create a new instance of the PublicClientApplication class
  private msalInstance: msal.PublicClientApplication;
  
  constructor() {
    // initialize the msalInstance variable with the configured PublicClientApplication
    this.msalInstance = new msal.PublicClientApplication(this.msalConfig);
  }
  
  // define the getAllAccounts() method to retrieve all signed-in accounts
  getAllAccounts(): msal.AccountInfo[] {
    return this.msalInstance.getAllAccounts();
  }
  
  // define the login() method to initiate the MSAL login process
  login() {
    const request = {
      scopes: ['openid', 'profile', 'user.read'],
    };
    return this.msalInstance.loginPopup(request);
  }
  
  // define the logout() method to sign the user out of the application
  logout() {
    this.msalInstance.logoutPopup();
  }
  
  
  // define the isLoggedIn() method to check whether the user is currently signed in
  isLoggedIn(): boolean {
    const accounts = this.getAllAccounts();
    return accounts.length > 0;
  }
  
  // define the getAccessToken() method to retrieve an access token for the Graph API
  async getAccessToken(): Promise<string> {
    const request = {
      scopes: ['https://graph.microsoft.com/user.read'],
    };
    try {
      const response = await this.msalInstance.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      const response = await this.msalInstance.acquireTokenPopup(request);
      return response.accessToken;
    }
  }

}
