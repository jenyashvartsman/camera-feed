import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignInResponse } from './dto/sign-in-response.dto';
import { SignInRequest } from './dto/sign-in-request.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly apiUrl = `${environment.apiUrl}/sessions`;

  constructor(private http: HttpClient) {}

  /**
   * Sign in to the session service.
   * @param {SignInRequest} payload - The sign-in request payload containing username and password.
   * @returns {SignInResponse} An observable of the sign-in response.
   */
  signIn(payload: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.apiUrl}/user`, payload);
  }

  /**
   * Sign out of the session service.
   * @param {string} id - The ID of the session to sign out.
   * @returns An observable that completes when the sign-out is successful.
   */
  signOut(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
