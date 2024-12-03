import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;
  user: number;  // Alterado para armazenar o objeto completo do usuário
  userName: string | null = '';

  private snackBar = inject(MatSnackBar);

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const userString = sessionStorage.getItem('user'); // Recupera o usuário armazenado
    this.user = userString ? JSON.parse(userString) : {};  // Converte a string de volta para o objeto, ou usa um objeto vazio
    this.form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: [''],
    });
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
    this.userName = sessionStorage.getItem('username');
  }

  onSubmit() {
    const courseData = this.form.value;

  // Recuperar o token do sessionStorage
  const token = sessionStorage.getItem("auth-token");

  // Verificar se o token está disponível
  if (!token) {
    console.error("Token não encontrado no sessionStorage");
    this.onError();
    return;
  }

  // Adicionar o token ao corpo da requisição
  courseData.token = token;

  // Chamar o método save para criar ou atualizar o curso
  this.service.save(courseData).subscribe({
    next: (response) => {
      console.log('Curso salvo com sucesso:', response);
      this.onSuccess();
    },
    error: (err) => {
      console.error('Erro ao salvar curso:', err);
      this.onError();
    },
  });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Salvo com Sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao Salvar!', '', { duration: 5000 });
  }

  onLogout() {
    this.service.logout();
    // Redireciona para a tela de login
    this.router.navigate(['/login']);
  }
}
