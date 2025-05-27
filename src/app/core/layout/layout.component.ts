import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SessionFacadeService } from '../auth/session-facade.service';
import { SessionStateService } from '../auth/session-state.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  // state management for the layout component
  name: string | undefined;

  constructor(
    private sessionFacadeService: SessionFacadeService,
    private sessionStateService: SessionStateService,
  ) {
    this.name = this.sessionStateService.user()?.name;
  }

  signOutClick(): void {
    this.sessionFacadeService.signOut();
  }
}
