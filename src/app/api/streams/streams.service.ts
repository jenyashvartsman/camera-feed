import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreamsService {
  private readonly apiUrl = `${environment.apiUrl}/streams`;

  constructor(private http: HttpClient) {}

  /**
   * Get stream frame.
   * @param {string} id - The ID of the stream.
   * @param {number} [height] - Optional height of the frame.
   * @param {number} [width] - Optional width of the frame.
   * @returns {Blob} An observable of stream frame.
   */
  getFrame(id: string, height?: number, width?: number): Observable<Blob> {
    const params: any = { height, width };
    return this.http.get(`${this.apiUrl}/${id}/frame`, {
      responseType: 'blob',
      params,
    });
  }
}
