import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from '../modal/modal.component';
import { Aluno } from '../aluno.model';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.css',
})
export class ListaAlunosComponent implements OnInit {
  // define as colunas da tabela
  displayedColumns: string[] = ['id', 'nome', 'email', 'matricula', 'acoes'];
  // define os dados da tabela
  dataSource: Aluno[] = [];

  constructor(public dialog: MatDialog, private _alunoService: AlunosService) {}

  ngOnInit(): void {
    // quando carregar a pagina, fazer a busca dos alunos na api
    this.atualizarTabela();
  }

  atualizarTabela(): void {
    this._alunoService.buscarAlunos().subscribe((alunos) => {
      this.dataSource = alunos;
    });
  }

  exluirAluno(aluno: Aluno): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        aluno,
        title: 'Excluir Aluno',
        description: `Você realmente deseja excluir o Aluno: ${aluno.nome}?`,
        showFeedbackButtons: true,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (eParaExcluir) => {
        if (eParaExcluir && aluno.id) {
          this._alunoService.deletarAluno(aluno.id).subscribe((_) => {
            this.atualizarTabela();
          });
        }
      },
      error: (error) => console.log(error),
    });
  }
}
