import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { provideHttpClient } from '@angular/common/http';
import { SessionFacadeService } from '../../core/auth/session-facade.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let sessionFacadeService: SessionFacadeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;

    sessionFacadeService = TestBed.inject(SessionFacadeService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.isLoading()).toBeFalse();
    expect(component.errorMessage()).toBeNull();
  });

  it('should execute sign in', () => {
    spyOn(sessionFacadeService, 'signIn').and.callThrough();
    component.signIn('john', '123');
    expect(sessionFacadeService.signIn).toHaveBeenCalledWith('john', '123');
  });
});
