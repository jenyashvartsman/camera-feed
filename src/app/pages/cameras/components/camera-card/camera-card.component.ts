import { Component, Input, OnInit, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CameraDto } from '../../../../api/cameras/dto/cameras.dto';
import { CameraStreamFacadeService } from '../../facade/camera-stream-facade.service';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-camera-card',
  imports: [MatCardModule, MatIconModule, DatePipe],
  templateUrl: './camera-card.component.html',
  styleUrl: './camera-card.component.scss',
  providers: [CameraStreamFacadeService],
})
export class CameraCardComponent implements OnInit {
  @Input({ required: true }) camera!: CameraDto;

  stream: Signal<string | null>;
  error: Signal<boolean>;
  loading: Signal<boolean>;
  timestamp: Signal<Date | null>;

  constructor(private cameraStreamFacadeService: CameraStreamFacadeService) {
    this.stream = this.cameraStreamFacadeService.stream;
    this.error = this.cameraStreamFacadeService.error;
    this.loading = this.cameraStreamFacadeService.loading;
    this.timestamp = this.cameraStreamFacadeService.timestamp;
  }

  ngOnInit(): void {
    this.cameraStreamFacadeService.streamRefresh(this.camera.primaryStream.id);
  }
}
