import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from './aluno.model';


@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private apiUrl = 'http://localhost:3000/alunos';

  constructor(private http: HttpClient) {}

  private gerarNumeroRandomico(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  buscarAlunos(): Observable<any> { // busca todos os alunos
    return this.http.get(this.apiUrl);
  }

  buscarAluno(id: number): Observable<any> { //busca aluno por id
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  criarAluno(aluno: any): Observable<any> {  
    aluno.matricula = this.gerarNumeroRandomico();
    return this.http.post(this.apiUrl, aluno);
  }

  atualizarAluno(id: number, aluno: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, aluno);
  }

  deletarAluno(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
