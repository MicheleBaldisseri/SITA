import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent {

    opSelected = '';
    value = '';
    
    constructor(    
        public dialogRef: MatDialogRef<FilterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    confirm(): void {
        this.dialogRef.close({value: this.opSelected+this.value});
    }

    refuse(): void {
        this.dialogRef.close(false);
    }

    removeFilter(){
        delete this.data.filters;
    }

}
