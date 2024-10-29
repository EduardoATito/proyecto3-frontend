import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRecursoComponent } from './eliminar-recurso.component';

describe('EliminarRecursoComponent', () => {
  let component: EliminarRecursoComponent;
  let fixture: ComponentFixture<EliminarRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarRecursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
