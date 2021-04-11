import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  _talkMorePlan: any[];
  _matDataSource: any[] = []
  newRequestForm: FormGroup;
  dados: any = [];
  edit: boolean = false;
  openEdit: boolean = false;
  orderForm!: FormGroup;
  items!: FormArray;

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private fb: FormBuilder,
    private coolDialogs: NgxCoolDialogsService,
    private dialog: MatDialog, private formBuilder: FormBuilder) {
    this._talkMorePlan = ['FaleMais 30', 'FaleMais 60', 'FaleMais 120'];
    this.newRequestForm = this.fb.group({
      nome: [null, Validators.required],
      id: [null],
      cep: [null, Validators.required],
      bairro: [null, Validators.required],
      endereco: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null],
      uf: [null, Validators.required],
      cidade: [null, Validators.required],
      telefone: [null, Validators.required],
      cpf: [null, Validators.required],
      especialidade: [null, Validators.required],
      crm: [null, Validators.required],
      cbo: [null, Validators.required],
      unidadeDeSaude: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.GetRequests();
    this.orderForm = this.formBuilder.group({
      customerName: '',
      email: '',
      items: this.formBuilder.array([ this.createItem() ])
    });

  }

  get itemsFormGroups () {
    return this.orderForm.get('items') as FormArray
  }

  removeFormControl(i: number) {
    let usersArray = this.orderForm.get('items') as FormArray;
    usersArray.removeAt(i);
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
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
      this.ConfirmAction("Deseja confirmar a operação?", () => this.SaveRequest());
    }
  }

  SaveRequest(id?: any): void {
    let newArray: any = JSON.parse(localStorage.getItem('dados') || '{}');
    let editableId: any = localStorage.getItem('editableId');

    if(!this.edit){
      var request: any = {
        id: Math.floor((Math.random() * 6) + 1),
        nome: this.newRequestForm.controls.nome.value,
        cep: this.newRequestForm.controls.cep.value,
        bairro: this.newRequestForm.controls.bairro.value,
        endereco: this.newRequestForm.controls.endereco.value,
        numero: this.newRequestForm.controls.numero.value,
        complemento: this.newRequestForm.controls.complemento.value,
        uf: this.newRequestForm.controls.uf.value,
        cidade: this.newRequestForm.controls.cidade.value,
        telefone: this.newRequestForm.controls.telefone.value,
        cpf: this.newRequestForm.controls.cpf.value,
        especialidade: this.newRequestForm.controls.especialidade.value,
        crm: this.newRequestForm.controls.crm.value,
        cbo: this.newRequestForm.controls.cbo.value,
        unidadeDeSaude: this.newRequestForm.controls.unidadeDeSaude.value,

      };
      this.dados.push(request);
      localStorage.setItem('dados', JSON.stringify(this.dados));
    }else{
      var request: any = {
        id: this.newRequestForm.controls.id.value,
        nome: this.newRequestForm.controls.nome.value,
        cep: this.newRequestForm.controls.cep.value,
        bairro: this.newRequestForm.controls.bairro.value,
        endereco: this.newRequestForm.controls.endereco.value,
        numero: this.newRequestForm.controls.numero.value,
        complemento: this.newRequestForm.controls.complemento.value,
        uf: this.newRequestForm.controls.uf.value,
        cidade: this.newRequestForm.controls.cidade.value,
        telefone: this.newRequestForm.controls.telefone.value,
        cpf: this.newRequestForm.controls.cpf.value,
        especialidade: this.newRequestForm.controls.especialidade.value,
        crm: this.newRequestForm.controls.crm.value,
        cbo: this.newRequestForm.controls.cbo.value,
        unidadeDeSaude: this.newRequestForm.controls.unidadeDeSaude.value,

      };


      newArray[editableId] = request;
      localStorage.setItem('dados', JSON.stringify(newArray));
    }
    this.edit = false;
    this.newRequestForm.reset();
    this.GetRequests();

  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      data: '',
      hora: '',
      horaS: '',
      unidade: ''
    });
  }

  GetRequests() {
    this.dados = localStorage.getItem('dados');
    this.dados = JSON.parse(this.dados);

    if (!this.dados) {
      this.dados = [];
    }

    this._matDataSource = [];

    this.dados.forEach((element: any, id: any) => {
      let tableLine: any = {
        nome: element.nome,
        cep: element.cep,
        bairro: element.bairro,
        endereco: element.endereco,
        numero: element.numero,
        complemento: element.complemento,
        uf: element.uf,
        cidade: element.cidade,
        telefone: element.telefone,
        cpf: element.cpf,
        especialidade: element.especialidade,
        crm: element.crm,
        cbo: element.cbo,
        unidadeDeSaude: element.unidadeDeSaude,
        cns: element.cns,
        id: element.id
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
      cep: editForm.cep,
      bairro: editForm.bairro,
      endereco: editForm.endereco,
      numero: editForm.numero,
      complemento: editForm.complemento,
      uf: editForm.uf,
      cidade: editForm.cidade,
      telefone: editForm.telefone,
      cpf: editForm.cpf,
      especialidade: editForm.especialidade,
      crm: editForm.crm,
      cbo: editForm.cbo,
      unidadeDeSaude: editForm.unidadeDeSaude,
      cns: editForm.cns,
    });
    this.edit = true;
  }

  DeleteRequest(index: any) {
    let newArray: any = JSON.parse(localStorage.getItem('dados') || '{}');
    newArray.splice(index, 1)
    localStorage.setItem('dados', JSON.stringify(newArray));
    this.GetRequests();


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
