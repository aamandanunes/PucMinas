import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-cadastro-unidades',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroUnidadesComponent implements OnInit {

  _talkMorePlan: any[];
  _matDataSource: any[] = []
  newRequestForm: FormGroup;
  dados: any = [];
  edit: boolean = false
  openEdit: boolean = false;
  displayedColumns: string[] = ['id', 'nome', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private fb: FormBuilder,
    private coolDialogs: NgxCoolDialogsService,
    private dialog: MatDialog) {
    this._talkMorePlan = ['FaleMais 30', 'FaleMais 60', 'FaleMais 120'];
    this.newRequestForm = this.fb.group({
      nome: [null, Validators.required],
      id: [null],
      bairro: [null, Validators.required],
      nomeEmpre: [null, Validators.required],
      numero: [null, Validators.required],
      endereco: [null, Validators.required],
      telefone: [null, Validators.required],
      estados: [null, Validators.required],
      cidade: [null, Validators.required],
      longitude: [null, Validators.required],
      latitude: [null, Validators.required],
      diretor: [null, Validators.required],
      ativo: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.GetRequests();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getMinutes(minutes: number): string {
    return minutes.toString() + ' min';
  }

  ConfirmAction(message: string, action: any) {
    this.coolDialogs.confirm(message)
      .subscribe((response: any) => {
        if (response) {
          action();
        }
      });
  }

  onSubmit() {
    debugger
    if (this.newRequestForm.valid) {
      if(!this.edit){
        this.ConfirmAction("Deseja confirmar a operação?", () => this.SaveRequest());
      }
      else{

        this.ConfirmAction("Deseja confirmar a operação?", () => this.SaveRequest());
      }
    }
  }

  SaveRequest(id?: any): void {
    let newArray: any = JSON.parse(localStorage.getItem('dados2') || '{}');
    let editableId: any = localStorage.getItem('editableId');

    if(!this.edit){
      var request: any = {
        id: Math.floor((Math.random() * 6) + 1),
        nome: this.newRequestForm.controls.nome.value,
        ativo: this.newRequestForm.controls.ativo.value,
        bairro: this.newRequestForm.controls.bairro.value,
        endereco: this.newRequestForm.controls.endereco.value,
        numero: this.newRequestForm.controls.numero.value,
        longitude: this.newRequestForm.controls.longitude.value,
        estados: this.newRequestForm.controls.estados.value,
        latitude: this.newRequestForm.controls.latitude.value,
        cidade: this.newRequestForm.controls.cidade.value,
        telefone: this.newRequestForm.controls.telefone.value,
        diretor: this.newRequestForm.controls.diretor.value,

      };
      this.dados.push(request);
      localStorage.setItem('dados2', JSON.stringify(this.dados));
    }else{
      var request: any = {
        id: this.newRequestForm.controls.id.value,
        nome: this.newRequestForm.controls.nome.value,
        ativo: this.newRequestForm.controls.ativo.value,
        bairro: this.newRequestForm.controls.bairro.value,
        endereco: this.newRequestForm.controls.endereco.value,
        numero: this.newRequestForm.controls.numero.value,
        longitude: this.newRequestForm.controls.longitude.value,
        estados: this.newRequestForm.controls.estados.value,
        latitude: this.newRequestForm.controls.latitude.value,
        cidade: this.newRequestForm.controls.cidade.value,
        telefone: this.newRequestForm.controls.telefone.value,
        diretor: this.newRequestForm.controls.diretor.value,
      };


      newArray[editableId] = request;
      localStorage.setItem('dados2', JSON.stringify(newArray));
    }
    this.edit = false;
    this.newRequestForm.reset();
    this.GetRequests();

  }

  GetRequests() {
    this.dados = localStorage.getItem('dados2');
    this.dados = JSON.parse(this.dados);

    if (!this.dados) {
      this.dados = [];
    }

    this._matDataSource = [];

    this.dados.forEach((element: any, id: any) => {
      let tableLine: any = {
        nome: element.nome,
        id: element.id,
        longitude: element.longitude,
        bairro: element.bairro,
        endereco: element.endereco,
        numero: element.numero,
        estados: element.estados,
        latitude: element.latitude,
        cidade: element.cidade,
        telefone: element.telefone,
        diretor: element.diretor,
        ativo: element.ativo,
      }
      this._matDataSource.push(tableLine);
    });
    this.dataSource = new MatTableDataSource<any>(this._matDataSource);
    this.dataSource.paginator = this.paginator;

  }

  onClickDelete(request: any) {
    this.ConfirmAction("Deseja confirmar a operação?", () => this.DeleteRequest(request));
  }
  onClickEdit(request: any, id: any) {
    let editForm = request;
    localStorage.setItem('editableId', id);
    this.newRequestForm.setValue({
      nome: editForm.nome,
      id: editForm.id,
      longitude: editForm.longitude,
      bairro: editForm.bairro,
      endereco: editForm.endereco,
      numero: editForm.numero,
      estados: editForm.estados,
      latitude: editForm.latitude,
      cidade: editForm.cidade,
      telefone: editForm.telefone,
      diretor: editForm.diretor,
      ativo: editForm.ativo,
    });
    this.edit = true;
  }

  DeleteRequest(index: any) {
    let newArray: any = JSON.parse(localStorage.getItem('dados2') || '{}');
    newArray.splice(index, 1)
    localStorage.setItem('dados2', JSON.stringify(newArray));
    this.GetRequests();


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
