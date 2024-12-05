import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPrestamoEspecialComponent } from './ver-prestamo-especial.component';

describe('VerPrestamoEspecialComponent', () => {
  let component: VerPrestamoEspecialComponent;
  let fixture: ComponentFixture<VerPrestamoEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPrestamoEspecialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPrestamoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
