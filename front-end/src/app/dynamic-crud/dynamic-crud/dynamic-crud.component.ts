import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BasicElement } from 'app/shared/model/Basicelements';
import { Kpi } from 'app/shared/model/Kpi';
import { BasicElementsService } from 'app/shared/service/basic-elements.service';
import { KpiService } from 'app/shared/service/kpi.service';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { SaveDialogComponent } from '../components/save-dialog/save-dialog.component';
import { SaveTresholdDialogComponent } from '../components/save-treshold-dialog/save-treshold-dialog.component';
import { UpdateDialogComponent } from '../components/update-dialog/update-dialog.component';

@Component({
  selector: 'app-dynamic-crud',
  templateUrl: './dynamic-crud.component.html',
  styleUrls: ['./dynamic-crud.component.css']
})
export class DynamicCrudComponent implements OnInit {
  
    //NgModel per blocchetto della costante
    constant = '';
    //NgModel per filtro di ricerca
    valueFilter = '';

    operators = ['+','-','*','/','(',')','[',']','{','}'];
    //per i tooltip
    operatorsName = ['Addition','Subtraction','Multiplication',
            'Division','Open bracket','Closed bracket','Open square bracket',
            'Closed square bracket','Open curly bracket','Closed curly bracket'];
    
    kpiInUse = []; //elements all'interno del KPI maker
    trash = [];
    
    //components = basic elements + kpis
    //filtrati
    components: any = [];
    //non filtrati
    allComponents: any = [];

    //variabile che traccia la modifica in corso di una kpi
    modifingKpi: boolean = false;
    //riferiemnto del kpi che si sta modificando
    kpiChanging;

    constructor(
        public dialog: MatDialog,
        private kpiService: KpiService,
        private basicElementsService: BasicElementsService
    ) { }

    ngOnInit(): void {
        this.initElementsList() //lista di kpis e basic elements
    }

    initElementsList(): void {
        this.getAllKpi();
        this.getAllBasicElements();
    }

    getAllKpi(): void {
        this.kpiService.getAllKpi().subscribe(
            elements => {
                this.components = [...this.components, ...elements];
                this.allComponents = [...this.allComponents, ...elements];
            }
        );
    }

    getAllBasicElements(): void{
        this.basicElementsService.getAllBasicElements().subscribe(
            elements => {
                this.components = [...this.components, ...elements];
                this.allComponents = [...this.allComponents, ...elements];
            }
        )
    }

    searchData() { //filtro dei components
        this.components = this.allComponents.filter((item) => {
            return item.label.toLowerCase().includes(this.valueFilter.toLowerCase());
        });
    }

    isKpi(val): boolean { 
        //le kpi hanno la property 'formula'
        return val.hasOwnProperty('formula'); 
    }

    isOperator(item): boolean {
        return typeof item === 'string';
    }

    dragStart(): void {
        document.getElementById('kpi-maker-input').classList.add('dragging');
    }

    dragEnd(): void {
        document.getElementById('kpi-maker-input').classList.remove('dragging');
    }

    drop(event: CdkDragDrop<any[]>, ignore?: boolean) {
        if(!ignore){
            if (event.previousContainer != event.container) {
            // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            // } else {
                    copyArrayItem(event.previousContainer.data,
                                    event.container.data,
                                    event.previousIndex,
                                    event.currentIndex);
                }
        }
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    dropInUse(event: CdkDragDrop<any[]>) {
        if (event.previousContainer.data === this.kpiInUse) {
            transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }
    //refil($event)
    refil(event: CdkDragDrop<any[]>) {
        if (event.previousContainer != event.container) {
        event.previousContainer.data.push(JSON.parse(JSON.stringify(event.container.data[event.currentIndex])))
        }
    }
    //modifica di un KPI
    modifyKpi(kpi: Kpi){
        this.kpiChanging = kpi;
        this.modifingKpi = true;
        //inserimento della formula nel kpiMaker
        let formulaFromStringToArray = kpi.formula.split("'"); //converto
        formulaFromStringToArray = formulaFromStringToArray.filter(el => el !== ","); //tolgo le virgole
        formulaFromStringToArray.pop(); //tolgo spazio alla fine
        formulaFromStringToArray.shift(); //tolgo spazio all'inizio
        this.kpiInUse.push(...formulaFromStringToArray);
    }
    //aggiungere soglia
    addTresholdKpi(kpi: Kpi) {
        const dialogRef = this.dialog.open(SaveTresholdDialogComponent, {
            width: '500px',
            height: '400px',
            data: kpi
        });

        dialogRef.afterClosed().subscribe(response => {
            if(response.isToUpdate){
                let updatedKpi = {...kpi};
                updatedKpi.threshold = response.threshold.toString();
                //aggiorno nel DB
                this.kpiService.updateKpi(updatedKpi).subscribe(
                    response => {
                        //aggiorno in locale
                        kpi.threshold = updatedKpi.threshold;
                    }, 
                    error => {
                        //TODO gestire l'errore mostrando messaggio
                        console.log(error)
                    }
                );
            }
        });
    }
    //elimina KPI chiedere conferma con un dialog
    deleteKpi(kpi: Kpi) {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            height: '300px',
            data: kpi
        });

        dialogRef.afterClosed().subscribe(toDelete => {
            if(toDelete){
                //elimino nel db
                this.kpiService.deleteKpi(kpi).subscribe();
                //elimino localmente
                for (let i = 0; i < this.components.length; i++) {
                    if (this.components[i].name === kpi.name) {
                        this.components.splice(i--, 1);
                    }
                }
                for (let i = 0; i < this.allComponents.length; i++) {
                    if (this.allComponents[i].name === kpi.name) {
                        this.allComponents.splice(i--, 1);
                    }
                }
            }
        });
    }

    //pulisce il KPI maker
    clear() {
        this.kpiInUse = [];
    }
    //rimuove un oggetto dal KPI maker
    removeItem(index){
        this.kpiInUse.splice(index, 1)
    }

    //salva la formula appena creata nel KPI maker
    save() {

        if(this.modifingKpi){ //modifica di una kpi
            const dialogRef = this.dialog.open(UpdateDialogComponent, {
                width: '500px',
                height: '230px'
            });
        
            dialogRef.afterClosed().subscribe(toUpdate => {
                if(toUpdate){
                    let kpiToUpdate = {...this.kpiChanging}
                    kpiToUpdate.formula = this.getAlgToSend();
                    this.kpiService.updateKpi(kpiToUpdate).subscribe(
                        response => {
                            //aggiorno in locale
                            this.kpiChanging.formula = kpiToUpdate.formula;
                            this.modifingKpi = false;
                            this.kpiInUse = [];
                        }, 
                        error => {
                            //TODO gestire l'errore mostrando messaggio
                            console.log(error)
                        }
                    );
                }
            });
        }else{ //aggiunta di una kpi
            const dialogRef = this.dialog.open(SaveDialogComponent, {
                width: '500px',
                height: '400px',
                data: {algo: this.kpiInUse}
            });
        
            dialogRef.afterClosed().subscribe(newKpi => {
                if(newKpi.isToCreate){
                    let kpi: Kpi = {
                        name: newKpi.label,
                        label: newKpi.label,
                        formula: this.getAlgToSend(),
                        threshold: newKpi.threshold
                    }
                    this.kpiService.addKpi(kpi).subscribe(
                        response => {
                            //aggiorno in locale
                            console.log(kpi)
                            this.components.unshift(kpi);
                            this.allComponents.unshift(kpi);
                        }, 
                        error => {
                            //TODO gestire l'errore mostrando messaggio
                            console.log(error)
                        }
                    );
                }
            });
        }
    }

    getAlgToSend(): string { //costruisce la formula sottoforma di string da mandare al BE
        let alg = '';
        this.kpiInUse.forEach(el => {
            if(typeof el === 'string'){
                alg += "'" + el + "'";
            }else{
                alg += "'" + el.label + "'";
            }
            alg += ',';
        })
        alg = alg.slice(0, -1);
        return alg;
    }

    getAlg(): string { //costruisce la formula sottoforma di string da visualizzare
        let alg = '[  ';
        this.kpiInUse.forEach(el => {
            if(typeof el === 'string'){
                alg += '"' + el + '"';
            }else{
                alg += '"' + el.label + '"';
            }
            alg += ', ';
        })
        alg = alg.slice(0, -2);
        return alg += ']';
    }

    getLabel(item): string {
        if(typeof item === 'string'){
            if(this.operators.includes(item)){
                return this.operatorsName[this.operators.indexOf(item)];
            }
            else return item;
        }
        return item.label;
    }

    getLabelMaker(item): string {
        if(typeof item === 'string'){
            return item;
        }
        return item.label;
    }

    checkSing() {
        /*let operator = this.todo.find((el) => (el == '+' || el == '-' || el == '*' || el == '/'));
        console.log(operator)
        if(operator){
        this.todo.splice(this.todo.indexOf(operator), 1);
        }*/

    }

}
