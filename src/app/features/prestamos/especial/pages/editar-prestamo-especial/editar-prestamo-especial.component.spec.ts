import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrestamoEspecialComponent } from './editar-prestamo-especial.component';

describe('EditarPrestamoEspecialComponent', () => {
  let component: EditarPrestamoEspecialComponent;
  let fixture: ComponentFixture<EditarPrestamoEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPrestamoEspecialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPrestamoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
