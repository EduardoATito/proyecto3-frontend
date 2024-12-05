import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPrestamosEspecialComponent } from './gestion-prestamos-especial.component';

describe('GestionPrestamosEspecialComponent', () => {
  let component: GestionPrestamosEspecialComponent;
  let fixture: ComponentFixture<GestionPrestamosEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPrestamosEspecialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPrestamosEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
