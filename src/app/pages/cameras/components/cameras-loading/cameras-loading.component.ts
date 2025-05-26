import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cameras-loading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './cameras-loading.component.html',
  styleUrl: './cameras-loading.component.scss',
})
export class CamerasLoadingComponent {}
