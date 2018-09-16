import { Article } from './../ngrx/models/article.model';
import { Pipe, PipeTransform } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';


@Pipe({
    name: 'Articlefilter',
    pure: false
})
export class ArticleFilterPipe implements PipeTransform {
  transform(articles: any, args?: any): Article[] {
    if ( !args ) {
      return articles;

    }  else {
      args = args.toUpperCase();
    }
    console.log(args);


    return articles.filter((items: Article ) => {
      if (
      (items.title.toUpperCase().startsWith(args) === true)
      || (items.context.toUpperCase().startsWith(args) === true)) {

        return items;
      } else if (items.author) {
        if( (items.author.name.toUpperCase().startsWith(args) === true)
        || (items.author.email.toUpperCase().startsWith(args) === true)
        || (items.author.lastname.toUpperCase().startsWith(args) === true)
        || (items.author.username.toUpperCase().startsWith(args) === true))
        {
          return items;
        }
      }
    });

    }


}



