import { PagedListingComponentBase, PagedRequestDto } from './../../shared/paged-listing-component-base';
import { ChangeDetectorRef, Component, Injector, OnDestroy } from '@angular/core';
import { appModuleAnimation } from './../../shared/animations/routerTransition';
import { FabricanteDto, FabricanteServiceProxy, CategoriaDto, CategoriaDtoPagedResultDto, CategoriaServiceProxy, ProdutoDto, ProdutoDtoPagedResultDto, ProdutoServiceProxy, UserDto } from './../../shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { finalize } from 'rxjs/operators';
import { CreateProdutoDialogComponent } from '../../app/produtos/create-produto-dialog/create-produto-dialog.component';
import { EditProdutoDialogComponent } from '../../app/produtos/edit-produto-dialog/edit-produto-dialog.component';
import { Subscription } from 'rxjs';
import { AppSessionService } from '../../shared/session/app-session.service';

class PagedProdutosRequestDto extends PagedRequestDto {
  keyword: string;
  fabricanteId: string;
  categoriaId: string;
}

@Component({
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
  animations: [appModuleAnimation()]
})
export class ProdutoComponent extends PagedListingComponentBase<ProdutoDto> implements OnDestroy {
  produtos: ProdutoDto[] =[];
  keyword = '';
  categoriaSelecionada = '';
  FabricanteSelecionado = '';
  fabricantes: FabricanteDto[] =[];
  categorias: CategoriaDto[] =[];
  subscriptions: Subscription[] = [];
  userId: number = 0;

  request: PagedProdutosRequestDto = new PagedProdutosRequestDto();

  constructor(
    injector: Injector,
    private _produtoService: ProdutoServiceProxy,
    private _modalService: BsModalService,
    private _fabricanteService: FabricanteServiceProxy,
    private _categoriaService: CategoriaServiceProxy,
    private _appSessions: AppSessionService,
    cdr: ChangeDetectorRef
  ) {
    super(injector, cdr);
  }

  ngAfterViewInit() {
    this.userId = this._appSessions.userId;
    const subFabricantes = this._fabricanteService.getAllListByName('').subscribe((result) => {
      this.fabricantes = result;
    });

    this.subscriptions.push(subFabricantes);

    const subCategorias = this._categoriaService.getAllListByName('').subscribe((result) => {
      this.categorias = result;
    });

    this.subscriptions.push(subCategorias);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  list(
    request: PagedProdutosRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._produtoService
      .getAll(request.fabricanteId, request.categoriaId, request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: ProdutoDtoPagedResultDto) => {
        this.produtos = result.items;
        this.showPaging(result, pageNumber);
        this.cd.detectChanges();
      });
  }

  delete(produto: ProdutoDto): void {
    abp.message.confirm(
      this.l('Tem certeza que vai deletar esse produto?', produto.nome),
      undefined,
      (result: boolean) => {
        if (result) {
          this._produtoService
            .delete(produto.id)
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
    devolverProduto(produto: ProdutoDto): void{
      abp.message.confirm(
        this.l('Tem certeza que vai devolver este produto?', produto.nome),
        undefined,
        (result: boolean) => {
          if (result) {
            this._produtoService
              .devolverProduto(produto.id)
              .pipe(
                finalize(() => {
                  abp.notify.success(this.l('SuccessfullyReturned'));
                  this.refresh();
                })
              )
              .subscribe(() => {});
          }
        }
      );



  }
  createProduto(): void {
    this.showCreateOrEditProdutoDialog();
  }

  editProduto(produto: ProdutoDto): void {
    this.showCreateOrEditProdutoDialog(produto.id);
  }

  showCreateOrEditProdutoDialog(id?: string): void {
    let createOrEditProdutoDialog: BsModalRef;
    if (!id) {
      createOrEditProdutoDialog = this._modalService.show(
        CreateProdutoDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditProdutoDialog = this._modalService.show(
        EditProdutoDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditProdutoDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  limparFiltros()
  {
    this.request = new PagedProdutosRequestDto();
    this.getDataPage(1);
  }
}

