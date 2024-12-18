import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarEstudianteComponent } from './seleccionar-estudiante.component';

describe('SeleccionarEstudianteComponent', () => {
  let component: SeleccionarEstudianteComponent;
  let fixture: ComponentFixture<SeleccionarEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
