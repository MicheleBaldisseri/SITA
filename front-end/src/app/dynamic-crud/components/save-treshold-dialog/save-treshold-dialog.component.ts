import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-treshold-dialog',
  templateUrl: './save-treshold-dialog.component.html',
  styleUrls: ['./save-treshold-dialog.component.css']
})
export class SaveTresholdDialogComponent{

    thresholdFromKpi: number;
    opSelected: string;

    constructor(
        public dialogRef: MatDialogRef<SaveTresholdDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        let symb = ['<', '>', '='];
        let stop = false;
        let threshold = this.data.threshold;
        let op;
        
        for (let i = 0; i < threshold.length && !stop; i++) {
            const c = threshold[i];
            if(!symb.includes(c)){
                stop = true;
                op = threshold.substring(0, i);
                threshold = threshold.substring(i, threshold.length);
            }            
        }
        this.thresholdFromKpi = Number(threshold);
        this.opSelected = op;
    }

    confirm(): void {
        this.dialogRef.close({isToUpdate: true, threshold: this.thresholdFromKpi.toString(), operator: this.opSelected});
    }

    refuse(): void {
        this.dialogRef.close({isToUpdate: false});
    }

}
