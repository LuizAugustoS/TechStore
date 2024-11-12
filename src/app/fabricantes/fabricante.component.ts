import { PagedListingComponentBase, PagedRequestDto } from './../../shared/paged-listing-component-base';
import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { appModuleAnimation } from './../../shared/animations/routerTransition';
import { FabricanteDto, FabricanteDtoPagedResultDto, FabricanteServiceProxy, CategoriaDto, CategoriaDtoPagedResultDto, CategoriaServiceProxy } from './../../shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { finalize } from 'rxjs/operators';
import { CreateFabricanteDialogComponent } from './../../app/fabricantes/create-fabricante-dialog/create-fabricante-dialog.component';
import { EditFabricanteDialogComponent } from './../../app/fabricantes/edit-fabricante-dialog/edit-fabricante-dialog.component';

class PagedFabricantesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
 templateUrl: './fabricante.component.html',
  styleUrl: './fabricante.component.css',
  animations: [appModuleAnimation()]
})
export class FabricanteComponent extends PagedListingComponentBase<FabricanteDto> {
  fabricantes: FabricanteDto[] =[];
  keyword = '';

  constructor(
    injector: Injector,
    private _fabricanteService: FabricanteServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  list(
    request: PagedFabricantesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._fabricanteService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: FabricanteDtoPagedResultDto) => {
        this.fabricantes = result.items;
        this.showPaging(result, pageNumber);
        this.cd.detectChanges();
      });
  }

  delete(fabricante: FabricanteDto): void {
    abp.message.confirm(
      this.l('Tem certeza que vai deletar esse fabricante?', fabricante.nome),
      undefined,
      (result: boolean) => {
        if (result) {
          this._fabricanteService
            .delete(fabricante.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  createFabricante(): void {
    this.showCreateOrEditFabricanteDialog();
  }

  editFabricante(fabricante: FabricanteDto): void {
    this.showCreateOrEditFabricanteDialog(fabricante.id);
  }

  showCreateOrEditFabricanteDialog(id?: string): void {
    let createOrEditFabricanteDialog: BsModalRef;
    if (!id) {
      createOrEditFabricanteDialog = this._modalService.show(
        CreateFabricanteDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditFabricanteDialog = this._modalService.show(
        EditFabricanteDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditFabricanteDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
