import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamerasGridComponent } from './cameras-grid.component';

describe('CamerasGridComponent', () => {
  let component: CamerasGridComponent;
  let fixture: ComponentFixture<CamerasGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamerasGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamerasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
