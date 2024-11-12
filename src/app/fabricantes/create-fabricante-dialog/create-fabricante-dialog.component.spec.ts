import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAutorDialogComponent } from './create-autor-dialog.component';

describe('CreateAutorDialogComponent', () => {
  let component: CreateAutorDialogComponent;
  let fixture: ComponentFixture<CreateAutorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAutorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAutorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
