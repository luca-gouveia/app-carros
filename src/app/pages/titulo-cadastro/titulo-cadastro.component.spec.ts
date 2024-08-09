import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloCadastroComponent } from './titulo-cadastro.component';

describe('TituloCadastroComponent', () => {
  let component: TituloCadastroComponent;
  let fixture: ComponentFixture<TituloCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TituloCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
