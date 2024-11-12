import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriaDialogComponent } from './create-categoria-dialog.component';

describe('CreateCategoriaDialogComponent', () => {
  let component: CreateCategoriaDialogComponent;
  let fixture: ComponentFixture<CreateCategoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoriaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
