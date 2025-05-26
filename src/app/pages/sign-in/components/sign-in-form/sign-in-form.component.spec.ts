import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormComponent } from './sign-in-form.component';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;

    component.isLoading = false;
    component.errorMessage = null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.signInForm).toBeTruthy();
    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBeNull();
  });

  it('should emit submit', () => {
    spyOn(component.submitClicked, 'emit');
    component.signInForm.patchValue({
      username: 'john',
      password: '123',
    });

    component.onSubmit();

    expect(component.submitClicked.emit).toHaveBeenCalledWith({
      username: 'john',
      password: '123',
    });
  });
});
