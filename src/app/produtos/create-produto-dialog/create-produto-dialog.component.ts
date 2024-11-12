import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import { AppComponentBase } from './../../../shared/app-component-base';
import { ProdutoServiceProxy, CreateProdutoDto, FabricanteServiceProxy, CategoriaServiceProxy, FabricanteDto, CategoriaDto } from './../../../shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-categoria-dialog',
   templateUrl: './create-produto-dialog.component.html',
})
export class CreateProdutoDialogComponent extends AppComponentBase implements OnInit {
  saving = false;
  produto = new CreateProdutoDto();
  subscriptions: Subscription[] = [];
  fabricantes: FabricanteDto[] = [];
  categorias: CategoriaDto[] = [];
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _produtoService: ProdutoServiceProxy,
    private _fabricanteService: FabricanteServiceProxy,
    private _categoriaService: CategoriaServiceProxy,
    public bsModalRef: BsModalRef,
    private cdr: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngAfterViewInit() {
    const subFabricantes = this._fabricanteService.getAllListByName('').subscribe((result) => {
      this.fabricantes = result;
      this.cdr.detectChanges();
    });

    this.subscriptions.push(subFabricantes);

    const subCategorias = this._categoriaService.getAllListByName('').subscribe((result) => {
      this.categorias = result;
      this.cdr.detectChanges();
    });

    this.subscriptions.push(subCategorias);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  save(): void {
    this.saving = true;

    const produto = new CreateProdutoDto();
    produto.init(this.produto);
    this._produtoService
      .create(produto)
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
