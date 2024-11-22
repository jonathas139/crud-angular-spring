import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit {

  form!: FormGroup;

  private snackBar = inject(MatSnackBar);

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private location: Location,
    private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
    _id: [''],
    name:[''],
    category: ['']
  });

  }
  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category:course.category
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
    this.snackBar.open('Salvo com Sucesso!', '', { duration: 5000 });
    this.onCancel();
  }
  private onError(){
    this.snackBar.open('Erro ao Salvar!', '', { duration: 5000 });
  }
}