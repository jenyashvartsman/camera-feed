import { Component, OnInit, Signal } from '@angular/core';
import { CamerasFacadeService } from './facade/cameras-facade.service';
import { CamerasWrapper } from '../../api/cameras/dto/cameras.dto';
import { CamerasLoadingComponent } from './components/cameras-loading/cameras-loading.component';
import { CamerasErrorComponent } from './components/cameras-error/cameras-error.component';
import { CamerasGridComponent } from './components/cameras-grid/cameras-grid.component';

@Component({
  selector: 'app-cameras',
  imports: [CamerasLoadingComponent, CamerasErrorComponent, CamerasGridComponent],
  templateUrl: './cameras.component.html',
  styleUrl: './cameras.component.scss',
  providers: [CamerasFacadeService],
})
export class CamerasComponent implements OnInit {
  // cameras
  cameras: Signal<CamerasWrapper>;
  camerasLoading: Signal<boolean>;
  camerasError: Signal<boolean>;

  constructor(private camerasFacadeService: CamerasFacadeService) {
    this.cameras = this.camerasFacadeService.cameras;
    this.camerasLoading = this.camerasFacadeService.loading;
    this.camerasError = this.camerasFacadeService.error;
  }

  ngOnInit(): void {
    this.camerasFacadeService.loadCameras();
  }
}
