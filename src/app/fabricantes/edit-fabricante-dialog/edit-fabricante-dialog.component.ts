
import { ChangeDetectorRef, Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { FabricanteServiceProxy, UpdateFabricanteDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-fabricante-dialog',
  templateUrl: './edit-fabricante-dialog.component.html',
  styleUrl: './edit-fabricante-dialog.component.css'
})
export class EditFabricanteDialogComponent  extends AppComponentBase{
  saving = false;
  id: string;
  fabricante = new UpdateFabricanteDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _fabricanteService: FabricanteServiceProxy,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;

    const fabricante = new UpdateFabricanteDto();
    fabricante.init(this.fabricante);
    fabricante.id = this.id;
    this._fabricanteService.update(fabricante).subscribe(
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
