import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoriaDialogComponent } from './edit-categoria-dialog.component';

describe('EditCategoriaDialogComponent', () => {
  let component: EditCategoriaDialogComponent;
  let fixture: ComponentFixture<EditCategoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoriaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
