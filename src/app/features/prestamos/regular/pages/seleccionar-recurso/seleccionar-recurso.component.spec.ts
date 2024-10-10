import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarRecursoComponent } from './seleccionar-recurso.component';

describe('SeleccionarRecursoComponent', () => {
  let component: SeleccionarRecursoComponent;
  let fixture: ComponentFixture<SeleccionarRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarRecursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
