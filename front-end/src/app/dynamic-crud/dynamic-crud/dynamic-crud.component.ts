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
import { FilterDialogComponent } from '../components/filter-dialog/filter-dialog.component';
import { FilterGroupByDialogComponent } from '../components/filter-groupBy-dialog/filter-groupBy-dialog.component';
import { MatTooltip } from '@angular/material/tooltip';

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
    
    kpiInUse: any[] = []; //elements all'interno del KPI maker
    kpiWithFilters: any[] = []; //elements all'interno della lista dei filters attivi
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
    //variabile che traccia la correttezza della sintassi dell'espressione di una kpi
    wrongExpr: boolean = false;
    //variabile che traccia se l'utente loggato è admin o guest
    isAdmin: boolean = false;

    constructor(
        public dialog: MatDialog,
        private kpiService: KpiService,
        private basicElementsService: BasicElementsService
    ) { }

    ngOnInit(): void {
        this.isAdminFn();
        this.initElementsList() //lista di kpis e basic elements
    }

    isAdminFn() {
        let user = JSON.parse(localStorage.getItem('User') as string);
        this.isAdmin = user.roles === 'admin' ? true : false;
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
        console.log(typeof item)
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
                copyArrayItem(event.previousContainer.data,
                                    event.container.data,
                                    event.previousIndex,
                                    event.currentIndex);
            }else{
                moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            }
        }
    }

    dropInUse(event: CdkDragDrop<any[]>) {
        if (event.previousContainer.data === this.kpiInUse) {
            transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }
    
    /*
    refil(event: CdkDragDrop<any[]>) {
        if (event.previousContainer != event.container) {
        event.previousContainer.data.push(JSON.parse(JSON.stringify(event.container.data[event.currentIndex])))
        }
    }*/

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
            if(response !== undefined && response.isToUpdate){
                let updatedKpi = {...kpi};
                updatedKpi.threshold = response.operator + response.threshold;
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
                this.kpiService.deleteKpi(kpi).subscribe(
                    (res) => {
                        console.log(res);
                    },
                    (error) => {
                        console.log(error);
                    } 
                );
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
        this.kpiWithFilters = [];
    }
    //rimuove un oggetto dal KPI maker
    removeItem(index, fromFilters){
        if(fromFilters){
            this.kpiWithFilters.splice(index, 1);
        } else { //fromKpiMaker  
            let indexOfFilter = this.kpiWithFilters.findIndex(kpi => kpi.name === this.kpiInUse[index].name);
            if(indexOfFilter !== -1){
                this.kpiWithFilters.splice(indexOfFilter, 1);
            }
            this.kpiInUse.splice(index, 1);
        }
    }

    checkFormula(formula): boolean {
        let ops = ['*', '/', '+', '-'];
        let brackets = ['(', '[', '{',')', ']', '}'];
        let queue = [];

        formula = formula.filter(el => brackets.includes(el))
        
        for (let i = 0; i < formula.length; i++) {
            const el = formula[i];

            if(el === '(' || el === '[' || el === '{') 
                queue.push(el);
            
            if(el === ')') {
                if((queue.length === 0) || (queue[queue.length-1] !== '(')){
                    return false;
                }
                else{
                    queue.pop();
                }
            }

            if(el === ']') {
                if(queue.length === 0 || queue[queue.length-1] !== '['){
                    return false;
                }
                else{
                    queue.pop();
                }
            }

            if(el === '}') {
                if(queue.length === 0 || queue[queue.length-1] !== '{'){
                    return false;
                }
                else{
                    queue.pop();
                }
            } 
        }
        return queue.length === 0;
    }

    //salva la formula appena creata nel KPI maker
    save() {

        //this.checkFormula(this.getAlgToSend())

        if(this.checkFormula([...this.kpiInUse])){ //la formula inserita ha una sintassi corretta
            this.wrongExpr = false;
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
                    if(newKpi !== undefined && newKpi.isToCreate){
                        let kpi: Kpi = {
                            name: newKpi.label,
                            label: newKpi.label,
                            formula: this.getAlgToSend(),
                            threshold: newKpi.threshold
                        }
                        this.kpiService.addKpi(kpi).subscribe(
                            response => {
                                //aggiorno in locale
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
        }else{//la formula inserita contiene errori di sintassi
            this.wrongExpr = true;
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
        let alg = '    ';
        this.kpiInUse.forEach(el => {
            if(typeof el === 'string'){
                alg += '"' + el + '"';
            }else{
                alg += '"' + el.label + '"';
            }
            alg += ', ';
        })
        alg = alg.slice(0, -2);
        return alg;
    }

    getWhereConditions(): string {
        let conditions = '    '; 
        this.kpiWithFilters.forEach(el => {
            if(el.hasOwnProperty('filters') && el.filters.hasOwnProperty('byValue')) conditions += '"' + el.label + ' ' + el.filters.byValue + '", ';
        })
        conditions = conditions.slice(0, -2);
        
        return conditions;
    }
    
    getGroupByConditions(): string {
        let conditions = '    '; 
        this.kpiWithFilters.forEach(el => {
            if(el.hasOwnProperty('filters') && el.filters.hasOwnProperty('groupBy')) conditions += '"' + el.label +  '", ';
        })
        conditions = conditions.slice(0, -2);
    
        return conditions;
    }

    checkCond(filter : string): boolean{

        let aux = this.kpiWithFilters.filter(el => el.filters);
        if(aux.length){
            aux = aux.filter(el => el.filters.hasOwnProperty(filter))
        }
        return aux.length !== 0;
        /*let index = -1;
        if(this.kpiWithFilters.findIndex(el => el.hasOwnProperty('filters')) !== -1){
            console.log(filter, this.kpiWithFilters)
            index = this.kpiWithFilters.findIndex(el => el.filters.hasOwnProperty(filter));
        }
        return index !== -1;*/
    }

    getLabel(item): string {
        if(typeof item === 'string'){
            if(this.operators.includes(item)){
                return this.operatorsName[this.operators.indexOf(item)];
            }
            else return item;
        }
        return item.name;
    }

    getLabelMaker(item): string {
        if(typeof item === 'string'){
            return item;
        }
        return item.label;
    }

    openFilterModal(item, i): void {
        
        const dialogRef = this.dialog.open(FilterDialogComponent, {
            width: '500px',
            height: 'fit-content',
            data: item
        });

        dialogRef.afterClosed().subscribe(toAddFilter => {
            if(toAddFilter){
                if(!this.kpiWithFilters[i].hasOwnProperty('filters')){
                    this.kpiWithFilters[i].filters = {
                        byValue: ''
                    };
                }
                this.kpiWithFilters[i].filters.byValue = toAddFilter.value;
            }
        });
    }

    openFilterGroupByModal(item, i): void {
        
        const dialogRef = this.dialog.open(FilterGroupByDialogComponent, {
            width: '500px',
            height: 'fit-content',
            data: item
        });

        dialogRef.afterClosed().subscribe(toAddFilter => {
            if(toAddFilter){
                if(!this.kpiWithFilters[i].hasOwnProperty('filters')){
                    this.kpiWithFilters[i].filters = {
                        groupBy: ''
                    };
                }
                this.kpiWithFilters[i].filters.groupBy = toAddFilter.value;
            }
        });
    }

    getNumberOfBadges(item, filter){
        let n: any = 0;
        if(item.hasOwnProperty('filters')){
            if(item.filters.hasOwnProperty(filter)){
                n = 1;
            }
        }
        return n;
    }

    getHiddenBadge(item, filter){
        if(item.hasOwnProperty('filters')){
            if(item.filters.hasOwnProperty(filter)){
                if(item.filters[filter] !== '') return false;
            }
        }
        return true;
    }

    filterAlreadyPresent(item): boolean{
        return !this.kpiWithFilters.some(el => el.name === item.name);
    }

    hideTooltipIn(tooltip : MatTooltip, ms : number){
        setTimeout(() => tooltip.hide(), ms);
      }
}
