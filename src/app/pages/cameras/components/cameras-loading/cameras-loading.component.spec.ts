import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamerasLoadingComponent } from './cameras-loading.component';

describe('CamerasLoadingComponent', () => {
  let component: CamerasLoadingComponent;
  let fixture: ComponentFixture<CamerasLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamerasLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamerasLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
