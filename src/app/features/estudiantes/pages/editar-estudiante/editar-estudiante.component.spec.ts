import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstudianteComponent } from './editar-estudiante.component';

describe('EditarEstudianteComponent', () => {
  let component: EditarEstudianteComponent;
  let fixture: ComponentFixture<EditarEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
