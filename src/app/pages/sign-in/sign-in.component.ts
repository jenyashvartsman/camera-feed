import { Component, OnInit, Signal } from '@angular/core';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { MatCardModule } from '@angular/material/card';
import { SessionFacadeService } from '../../core/auth/session-facade.service';
import { SessionStateService } from '../../core/auth/session-state.service';
import { Router } from '@angular/router';
import { dashboardRouteConfig } from '../../shared/config/routes.config';

@Component({
  selector: 'app-sign-in',
  imports: [MatCardModule, SignInFormComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  // sign-in state
  isLoading: Signal<boolean>;
  errorMessage: Signal<string | null>;

  constructor(
    private sessionFacadeService: SessionFacadeService,
    private sessionStateService: SessionStateService,
    private router: Router,
  ) {
    this.isLoading = this.sessionFacadeService.signInLoading;
    this.errorMessage = this.sessionFacadeService.signInError;
  }

  ngOnInit(): void {
    this.isSignedIn();
  }

  signIn(username: string, password: string): void {
    this.sessionFacadeService.signIn(username, password);
  }

  private isSignedIn(): void {
    if (this.sessionStateService.isUserSignedIn()) {
      this.router.navigate([dashboardRouteConfig], { replaceUrl: true });
    }
  }
}
