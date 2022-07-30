import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropDownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropDownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropDownDirective,
        CommonModule
    ]    
})
export class SharedModule {}