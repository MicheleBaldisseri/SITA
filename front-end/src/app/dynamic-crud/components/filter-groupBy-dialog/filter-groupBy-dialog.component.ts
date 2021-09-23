import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-groupBy-dialog',
  templateUrl: './filter-groupBy-dialog.component.html',
  styleUrls: ['./filter-groupBy-dialog.component.css']
})
export class FilterGroupByDialogComponent {

    isChecked = false;
    
    constructor(    
        public dialogRef: MatDialogRef<FilterGroupByDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    confirm(): void {
        this.dialogRef.close({value: this.isChecked});
    }

    refuse(): void {
        this.dialogRef.close(false);
    }

    removeFilter(){
        delete this.data.filters;
    }

}
