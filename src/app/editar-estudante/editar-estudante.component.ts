import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlunosService } from '../alunos.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-editar-estudante',
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
  templateUrl: './editar-estudante.component.html',
  styleUrl: './editar-estudante.component.css',
})
export class EditarEstudanteComponent implements OnInit {
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
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _alunoService: AlunosService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const alunoId = this.route.snapshot.paramMap.get('id');
    if (alunoId) {
      this._alunoService.buscarAluno(+alunoId).subscribe({
        next: (aluno) => {
          if (aluno && Object.keys(aluno).length !== 0) {
            this.matricula = aluno.matricula;
            this.options.patchValue(aluno);
          }
        },
        error: (_) => {
          this.router.navigate(['/']);
        },
      });
    }
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onSubmit() {
    const alunoId = this.route.snapshot.paramMap.get('id');
    if (this.options.valid && alunoId) {
      const a = {
        matricula: this.matricula,
        ...this.options.value,
      };

      this._alunoService.atualizarAluno(+alunoId, a).subscribe({
        next: () => {
          this.dialog.open(ModalComponent, {
            data: {
              title: 'Sucesso!',
              description: `Os dados do aluno foram atualizados com sucesso.`,
              showFeedbackButtons: false,
            },
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.dialog.open(ModalComponent, {
            data: {
              title: 'Erro',
              description: `Tivemos um problema para atualizar os dados do aluno: ${this.options.value.nome}.`,
              showFeedbackButtons: false,
            },
          });
          console.error(`erro: ${error.message}`);
        },
      });
    }
  }
}
