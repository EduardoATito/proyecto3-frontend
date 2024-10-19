import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoQrComponent } from './metodo-qr.component';

describe('MetodoQrComponent', () => {
  let component: MetodoQrComponent;
  let fixture: ComponentFixture<MetodoQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodoQrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodoQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
