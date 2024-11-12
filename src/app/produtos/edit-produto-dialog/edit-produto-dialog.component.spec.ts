import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLivroDialogComponent } from './edit-livro-dialog.component';

describe('EditLivroDialogComponent', () => {
  let component: EditLivroDialogComponent;
  let fixture: ComponentFixture<EditLivroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLivroDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLivroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
