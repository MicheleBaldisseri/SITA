import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent {

    name = '';
    threshold = '';
    opSelected = '';

    constructor(
        public dialogRef: MatDialogRef<SaveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    getAlg(): string {
        let alg = '[';
        this.data.algo.forEach(el => {
            if(typeof el === 'string'){
                alg += '"' + el + '"';
            }else{
                alg += '"' + el.name + '"';
            }
            alg += ', ';
        })
        return alg += ']';
    }

    confirm(): void {
        this.dialogRef.close({isToCreate: true, label: this.name, threshold: this.opSelected+this.threshold});
    }

    refuse(): void {
        this.dialogRef.close({isToCreate: false});
    }
}