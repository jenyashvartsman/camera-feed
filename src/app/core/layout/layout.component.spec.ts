import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { provideHttpClient } from '@angular/common/http';
import { SessionFacadeService } from '../auth/session-facade.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let sessionFacadeService: SessionFacadeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;

    sessionFacadeService = TestBed.inject(SessionFacadeService);

    fixture.detectChanges();
  });

  it('should call signOut on sessionFacadeService when signOut is called', () => {
    spyOn(sessionFacadeService, 'signOut').and.callThrough();
    component.signOutClick();
    expect(sessionFacadeService.signOut).toHaveBeenCalled();
  });
});
