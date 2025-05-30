import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamerasComponent } from './cameras.component';
import { provideHttpClient } from '@angular/common/http';

describe('CamerasComponent', () => {
  let component: CamerasComponent;
  let fixture: ComponentFixture<CamerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamerasComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
