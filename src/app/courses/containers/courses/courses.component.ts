import { Component, inject } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimDialogComponent } from '../../../shared/components/confim-dialog/confim-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;

  private snackBar = inject(MatSnackBar);

  //coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route:  ActivatedRoute
  ){
    this.refresh();
  }

  refresh(){
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar!');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
  onConfirm(errorMsg: string){
    const dialogRef = this.dialog.open(ConfimDialogComponent,{
      data: errorMsg
    });
    return dialogRef.afterClosed();
  }
  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onDelete(course: Course) {
    this.onConfirm(`Tem certeza que deseja remover? "${course.name}"?`).subscribe(result => {
      if (result) {
        this.coursesService.delete(course._id).subscribe(() => {
        this.refresh();
        this.snackBar.open('Excluido com Sucesso!', 'X', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
        }, error => {
          this.onError('Erro ao tentar Remover!')
          this.refresh();
        });
      } else {
        this.refresh();
      }
    });
  }

  onLogout(){
      this.coursesService.logout();
      // Redireciona para a tela de login
      this.router.navigate(['/login']);

  }
}
