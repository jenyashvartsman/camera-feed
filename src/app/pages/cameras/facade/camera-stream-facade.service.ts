import { Injectable, OnDestroy, Signal, signal } from '@angular/core';
import { StreamsService } from '../../../api/streams/streams.service';

@Injectable()
export class CameraStreamFacadeService implements OnDestroy {
  // state
  private readonly _stream = signal<string | null>(null);
  private readonly _error = signal<boolean>(false);
  private readonly _loading = signal<boolean>(false);
  private readonly _timestamp = signal<Date | null>(null);

  // interval for refreshing the stream
  private refreshInterval: ReturnType<typeof setInterval> | null = null;
  private readonly refreshIntervalTime = 5_000;

  // readonly signals for the state
  get stream(): Signal<string | null> {
    return this._stream.asReadonly();
  }

  get error(): Signal<boolean> {
    return this._error.asReadonly();
  }

  get loading(): Signal<boolean> {
    return this._loading.asReadonly();
  }

  get timestamp(): Signal<Date | null> {
    return this._timestamp.asReadonly();
  }

  constructor(private streamService: StreamsService) {}

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  /**
   * Starts refreshing the stream frame at a specified interval.
   * This method will load the initial frame and then continue to refresh it every 5 seconds.
   * @param {string} id - The ID of the stream to refresh.
   * @returns {void}
   * */
  streamRefresh(id: string): void {
    this.loadStreamFrame(id);
    this.refreshInterval = setInterval(() => this.loadStreamFrame(id), this.refreshIntervalTime);
  }

  private loadStreamFrame(id: string): void {
    if (!this._loading()) {
      this._loading.set(true);
      this._error.set(false);

      this.streamService.getFrame(id, 400, 400).subscribe({
        next: (response) => {
          this._loading.set(false);
          const stream = URL.createObjectURL(response);
          this._stream.set(stream);
          this._timestamp.set(new Date());

          // TODO - will fail if called here
          // needs to be called only after image is loaded, requires some refactor on how stream() is handled
          // URL.revokeObjectURL(stream);
        },
        error: () => {
          this._loading.set(false);
          this._error.set(true);
          this._stream.set(null);
          this._timestamp.set(null);
        },
      });
    }
  }
}
