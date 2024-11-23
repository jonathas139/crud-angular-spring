import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'Pendente': return 'priority_high';
      case 'Andamento': return 'engineering';
      case 'Concluida': return 'check_circle';


    }
    return 'code';
  }

}
