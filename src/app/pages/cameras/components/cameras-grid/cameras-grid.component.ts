import { Component, Input } from '@angular/core';
import { CameraDto } from '../../../../api/cameras/dto/cameras.dto';
import { CameraCardComponent } from '../camera-card/camera-card.component';

@Component({
  selector: 'app-cameras-grid',
  imports: [CameraCardComponent],
  templateUrl: './cameras-grid.component.html',
  styleUrl: './cameras-grid.component.scss',
})
export class CamerasGridComponent {
  @Input({ required: true }) cameras!: CameraDto[]; // Replace 'any' with the actual type of camera objects
}
