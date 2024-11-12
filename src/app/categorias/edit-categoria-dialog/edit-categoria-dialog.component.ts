import { ChangeDetectorRef, Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CategoriaServiceProxy, UpdateCategoriaDto } from '../../../shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-categoria-dialog',
  templateUrl: './edit-categoria-dialog.component.html',
  styleUrl: './edit-categoria-dialog.component.css'
})
export class EditCategoriaDialogComponent  extends AppComponentBase{
  saving = false;
  id: string;
  categoria = new UpdateCategoriaDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _categoriaService: CategoriaServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    const categoria = new UpdateCategoriaDto();
    categoria.init(this.categoria);
    categoria.id = this.id;
    this._categoriaService.update(categoria).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
