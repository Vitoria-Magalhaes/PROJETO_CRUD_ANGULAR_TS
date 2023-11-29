import { Routes } from '@angular/router';
import { ListaAlunosComponent } from './lista-alunos/lista-alunos.component';
import { EditarEstudanteComponent } from './editar-estudante/editar-estudante.component';
import { CadastrarEstudanteComponent } from './cadastrar-estudante/cadastrar-estudante.component';

export const routes: Routes = [
  {
    path: '',
    component: ListaAlunosComponent,
  },
  {
    path: 'editar-estudante/:id',
    component: EditarEstudanteComponent,
  },
  {
    path: 'cadastrar-estudante',
    component: CadastrarEstudanteComponent,
  },
];
