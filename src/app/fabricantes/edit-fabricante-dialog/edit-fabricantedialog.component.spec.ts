import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFabricanteDialogComponent } from './edit-Fabricante-dialog.component';

describe('EditFabricanteDialogComponent', () => {
  let component: EditFabricanteDialogComponent;
  let fixture: ComponentFixture<EditFabricanteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFabricanteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFabricanteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
