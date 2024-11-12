import { ChangeDetectorRef, Component, EventEmitter, Injector, output } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CategoriaServiceProxy, CreateCategoriaDto } from '../../../shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-categoria-dialog',
  templateUrl: './create-categoria-dialog.component.html',
  styleUrl: './create-categoria-dialog.component.scss'
})
export class CreateCategoriaDialogComponent extends AppComponentBase {
  saving = false;
  categoria = new CreateCategoriaDto();

  onSave = output<EventEmitter<any>>()

  constructor(
    injector: Injector,
    private _categoriaService: CategoriaServiceProxy,
    public bsModalRef: BsModalRef,
    private cdr: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    const categoria = new CreateCategoriaDto();
    categoria.init(this.categoria);
    this._categoriaService
      .create(categoria)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit(null);
        },
        () => {
          this.saving = false;
          this.cdr.detectChanges();
        }
      );
  }
}
