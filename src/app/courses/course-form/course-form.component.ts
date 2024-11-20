import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form: FormGroup;
  private snackBar = inject(MatSnackBar);

  constructor(private formBuilder: FormBuilder,
    private service: CoursesService) {
    this.form = this.formBuilder.group({
      name:[null],
      category: [null]
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => console.log(result),
      error: () => this.onError()});
  }

  onCancel(){
  }

  private onError(){
    this.snackBar.open('Erro ao Salvar Curso!', '', { duration: 5000 });
  }
}
