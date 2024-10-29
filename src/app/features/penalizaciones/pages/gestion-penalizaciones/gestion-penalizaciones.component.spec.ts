import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPenalizacionesComponent } from './gestion-penalizaciones.component';

describe('GestionPenalizacionesComponent', () => {
  let component: GestionPenalizacionesComponent;
  let fixture: ComponentFixture<GestionPenalizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPenalizacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPenalizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
