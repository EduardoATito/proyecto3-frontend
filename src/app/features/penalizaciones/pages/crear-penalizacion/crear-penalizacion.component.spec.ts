import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPenalizacionComponent } from './crear-penalizacion.component';

describe('CrearPenalizacionComponent', () => {
  let component: CrearPenalizacionComponent;
  let fixture: ComponentFixture<CrearPenalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPenalizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPenalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
