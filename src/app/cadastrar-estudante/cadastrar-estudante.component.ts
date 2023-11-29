import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importações do Angular Material
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { AlunosService } from '../alunos.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cadastrar-estudante',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
  ],
  templateUrl: './cadastrar-estudante.component.html',
  styleUrl: './cadastrar-estudante.component.css',
})
export class CadastrarEstudanteComponent {
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  isUpdateMode = false;
  matricula = null;

  options = this._formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    matricula: [{ value: '', disabled: true }],
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _alunosService: AlunosService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onSubmit() {
    if (this.options.valid) {
      this._alunosService.criarAluno(this.options.value).subscribe({
        next: () => {
          this.dialog.open(ModalComponent, {
            data: {
              title: 'Sucesso!',
              description: `O estudante: ${this.options.value.nome} foi cadastrado com sucesso.`,
              showFeedbackButtons: false,
            },
          });
          this.router.navigate(['/']);
        },
        error: (_) => {
          this.dialog.open(ModalComponent, {
            data: {
              title: 'Erro',
              description: `Erro ao cadastrar aluno.`,
              showFeedbackButtons: false,
            },
          });
          console.error(`erro ao cadastrar o aluno`);
        },
      });
    }
  }
}
