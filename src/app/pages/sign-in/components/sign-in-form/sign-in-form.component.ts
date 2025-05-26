import { Component, Input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent {
  // inputs
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) errorMessage!: string | null;

  // outputs
  submitClicked = output<{ username: string; password: string }>();

  // form
  signInForm!: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  // password
  hidePassword = true;

  constructor() {
    this.createForm();
  }

  onSubmit() {
    this.submitClicked.emit({
      username: this.signInForm.value.username!,
      password: this.signInForm.value.password!,
    });
  }

  private createForm(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }
}
