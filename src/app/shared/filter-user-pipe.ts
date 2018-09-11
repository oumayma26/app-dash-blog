import { User } from './../ngrx/models/user.model';
import { Pipe, PipeTransform } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';


@Pipe({
    name: 'Userfilter',
    pure: false
})
export class UserFilterPipe implements PipeTransform {
  transform(users: any, args?: any): User[] {
    if ( !args ) {
      return users;

    }  else {
      args = args.toUpperCase();
    }
    console.log(args);


    return users.filter((items: User) => {

      if ((items.name.toUpperCase().startsWith(args) === true)
      || (items.email.toUpperCase().startsWith(args) === true)
      || (items.lastname.toUpperCase().startsWith(args) === true)
      || (items.username.toUpperCase().startsWith(args) === true)) {

        return items;
      }
    });

    }


}



