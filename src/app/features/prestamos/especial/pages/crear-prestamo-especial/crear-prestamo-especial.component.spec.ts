import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPrestamoEspecialComponent } from './crear-prestamo-especial.component';

describe('CrearPrestamoEspecialComponent', () => {
  let component: CrearPrestamoEspecialComponent;
  let fixture: ComponentFixture<CrearPrestamoEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPrestamoEspecialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPrestamoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
