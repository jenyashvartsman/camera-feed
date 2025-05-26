import { Injectable, Signal, signal } from '@angular/core';
import { CamerasWrapper } from '../../../api/cameras/dto/cameras.dto';
import { CamerasService } from '../../../api/cameras/cameras.service';

@Injectable()
export class CamerasFacadeService {
  // state
  private readonly _cameras = signal<CamerasWrapper>({ cameras: [] });
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<boolean>(false);

  // readonly signals for the state
  get cameras(): Signal<CamerasWrapper> {
    return this._cameras.asReadonly();
  }

  get loading(): Signal<boolean> {
    return this._loading.asReadonly();
  }

  get error(): Signal<boolean> {
    return this._error.asReadonly();
  }

  constructor(private camerasService: CamerasService) {}

  /**
   * Initializes the cameras facade service by loading all cameras.
   * This method should be called once when the service is created.
   * @return {void}
   */
  loadCameras(): void {
    this._loading.set(true);
    this._error.set(false);

    this.camerasService.getAll().subscribe({
      next: (response) => {
        this._loading.set(false);
        this._cameras.set(response);
      },
      error: () => {
        this._loading.set(false);
        this._error.set(true);
        this._cameras.set({ cameras: [] });
      },
    });
  }
}
