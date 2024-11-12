import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import { AppComponentBase } from './../../../shared/app-component-base';
import { ProdutoServiceProxy, CreateProdutoDto, FabricanteServiceProxy, CategoriaServiceProxy, FabricanteDto, CategoriaDto, UpdateProdutoDto, ProdutoDto } from './../../../shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-produto-dialog',
  templateUrl: './edit-produto-dialog.component.html'
})

export class EditProdutoDialogComponent extends AppComponentBase implements OnInit{
  id: string;
  saving = false;
  produto = new UpdateProdutoDto();
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

    this._produtoService.get(this.id).subscribe((result) => {
      this.produto.id = result.id;
      this.produto.fabricanteId = result.fabricante.id;
      this.produto.categoriaId = result.categoria.id;
      this.produto.nome = result.nome;
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {

  }

  save(): void {
    this.saving = true;

    this._produtoService
      .update(this.produto)
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
