import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeUIComponent } from './perfume-ui.component';

describe('PerfumeUIComponent', () => {
  let component: PerfumeUIComponent;
  let fixture: ComponentFixture<PerfumeUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfumeUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfumeUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
