import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SessionFacadeService } from '../auth/session-facade.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(private sessionFacadeService: SessionFacadeService) {}

  signOutClick(): void {
    this.sessionFacadeService.signOut();
  }
}
