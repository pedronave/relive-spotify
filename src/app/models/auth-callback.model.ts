export interface AuthCallback {
  access_token: string;
  expires_in: number;
  token_type: string;
  error: string;
  state: string;
}

export class AuthState {
  accessToken: string;
  expirationDate: Date;
  tokenType: string;

  constructor(obj?: Partial<AuthState>) {
    Object.assign(this, obj);
    this.expirationDate = new Date(obj.expirationDate);
  }

  static fromAuthCallback(callback: AuthCallback) {
    const expirationDate = new Date(Date.now() + callback.expires_in * 1000);
    console.log(`Found date: ${expirationDate}`);
    return new AuthState({accessToken: callback.access_token, expirationDate, tokenType: callback.token_type});
  }
}
