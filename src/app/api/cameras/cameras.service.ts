import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CamerasWrapper } from './dto/cameras.dto';

@Injectable({
  providedIn: 'root',
})
export class CamerasService {
  private readonly apiUrl = `${environment.apiUrl}/cameras`;

  constructor(private http: HttpClient) {}

  /**
   * Get all cameras.
   * @returns {CamerasWrapper} An observable of cameras wrapper.
   */
  getAll(): Observable<CamerasWrapper> {
    return this.http.get<CamerasWrapper>(this.apiUrl);
  }
}
