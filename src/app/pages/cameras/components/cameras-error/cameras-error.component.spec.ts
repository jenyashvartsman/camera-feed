import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamerasErrorComponent } from './cameras-error.component';

describe('CamerasErrorComponent', () => {
  let component: CamerasErrorComponent;
  let fixture: ComponentFixture<CamerasErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamerasErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamerasErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
