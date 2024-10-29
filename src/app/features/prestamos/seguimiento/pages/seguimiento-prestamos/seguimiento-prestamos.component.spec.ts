import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPrestamosComponent } from './seguimiento-prestamos.component';

describe('SeguimientoPrestamosComponent', () => {
  let component: SeguimientoPrestamosComponent;
  let fixture: ComponentFixture<SeguimientoPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoPrestamosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
