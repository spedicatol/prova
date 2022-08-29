import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(monthNumber): unknown {
    return moment().month(monthNumber - 1).format("MMMM"); 
  }

}
