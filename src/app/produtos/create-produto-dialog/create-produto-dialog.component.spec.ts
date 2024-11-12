import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLivroDialogComponent } from './create-livro-dialog.component';

describe('CreateLivroDialogComponent', () => {
  let component: CreateLivroDialogComponent;
  let fixture: ComponentFixture<CreateLivroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLivroDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLivroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
