import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form!: FormGroup;

  private snackBar = inject(MatSnackBar);

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private location: Location) {
    this.form = this.formBuilder.group({
    name:[''],
    category: ['']
  });

  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: () => this.onError()});
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Criado com Sucesso!', '', { duration: 5000 });
    this.onCancel();
  }
  private onError(){
    this.snackBar.open('Erro ao Salvar!', '', { duration: 5000 });
  }
}
