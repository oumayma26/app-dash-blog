import { Category } from './../../../ngrx/models/category.model';
import { ArticlesService } from './../../../ngrx/services/article.service';
import { CategoryLogic } from './../../../ngrx/logic/category.store';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertMsgComponent } from '../../../alert-msg/alert-msg.component';
import { OnInit, Component } from '@angular/core';

@Component ({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  formFildes: FormGroup;

  constructor(
   private formBuilder: FormBuilder,
   private _logic: CategoryLogic,
   private service: ArticlesService,
   public dialog: MatDialog
    // public dialogRef: MatDialogRef<AddCategoryComponent>
  ) {

    this.formFildes = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(25)])
    });

   }

  ngOnInit() {

  }

save() {
  const c: Category = this.formFildes.value as Category;
  this._logic.saveCategory(c);



}

deleteCategory(id) {
  const dialogRef = this.dialog.open(AlertMsgComponent);

  dialogRef.afterClosed().subscribe(result => {

    if (result === true ) {
     // this._logic.delteArticle(id);
    }
    console.log(`Dialog result: ${result}`);
  });
}



// close() {
//   this.dialogRef.close();
// }

}
