import { PagedListingComponentBase, PagedRequestDto } from './../../shared/paged-listing-component-base';
import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { appModuleAnimation } from './../../shared/animations/routerTransition';
import { CategoriaDto, CategoriaDtoPagedResultDto, CategoriaServiceProxy } from './../../shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { finalize } from 'rxjs/operators';
import { CreateCategoriaDialogComponent } from './../../app/categorias/create-categoria-dialog/create-categoria-dialog.component';
import { EditCategoriaDialogComponent } from './../../app/categorias/edit-categoria-dialog/edit-categoria-dialog.component';

class PagedCategoriesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
  animations: [appModuleAnimation()]
})
export class CategoriaComponent extends PagedListingComponentBase<CategoriaDto> {
  categorias: CategoriaDto[] =[];
  keyword = '';

  constructor(
    injector: Injector,
    private _categoriaService: CategoriaServiceProxy,
    private _modalService: BsModalService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
  }

  list(
    request: PagedCategoriesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._categoriaService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CategoriaDtoPagedResultDto) => {
        this.categorias = result.items;
        this.showPaging(result, pageNumber);
        this.cd.detectChanges();
      });
  }

  delete(categoria: CategoriaDto): void {
    abp.message.confirm(
      this.l('Tem certeza que vai deletar essa categoria?', categoria.nome),
      undefined,
      (result: boolean) => {
        if (result) {
          this._categoriaService
            .delete(categoria.id)
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

  createCategoria(): void {
    this.showCreateOrEditCategoryDialog();
  }

  editCategoria(categoria: CategoriaDto): void {
    this.showCreateOrEditCategoryDialog(categoria.id);
  }

  showCreateOrEditCategoryDialog(id?: string): void {
    let createOrEditCategoriaDialog: BsModalRef;
    if (!id) {
      createOrEditCategoriaDialog = this._modalService.show(
        CreateCategoriaDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditCategoriaDialog = this._modalService.show(
        EditCategoriaDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditCategoriaDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
