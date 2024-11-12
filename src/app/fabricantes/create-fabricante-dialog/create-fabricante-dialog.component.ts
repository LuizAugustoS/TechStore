import { ChangeDetectorRef, Component, EventEmitter, Injector, output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FabricanteServiceProxy, CreateFabricanteDto } from '../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-fabricante-dialog',
 templateUrl: './create-fabricante-dialog.component.html',
  styleUrl: './create-fabricante-dialog.component.css'
})
export class CreateFabricanteDialogComponent extends AppComponentBase {
  saving = false;
  fabricante = new CreateFabricanteDto();

  onSave = output<EventEmitter<any>>()

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

    const fabricante = new CreateFabricanteDto();
    fabricante.init(this.fabricante);
    this._fabricanteService
      .create(fabricante)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit(null);
        },
        () => {
          this.saving = false;
          this.cd.detectChanges();
        }
      );
  }
}
