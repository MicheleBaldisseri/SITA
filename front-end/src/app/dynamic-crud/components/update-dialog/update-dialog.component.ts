import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {

    constructor(    
        public dialogRef: MatDialogRef<UpdateDialogComponent>
    ) {}

    confirm(): void {
        this.dialogRef.close(true);
    }

    refuse(): void {
        this.dialogRef.close(false);
    }

}
