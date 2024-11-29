import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEstudiantesComponent } from './gestion-estudiantes.component';

describe('GestionEstudiantesComponent', () => {
  let component: GestionEstudiantesComponent;
  let fixture: ComponentFixture<GestionEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
