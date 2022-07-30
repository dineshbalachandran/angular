import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
}) 
export class HeaderComponent implements OnInit, OnDestroy {  

    private userSub: Subscription;
    isAuthenticated = false;


    constructor(private dataStorage: DataStorageService, private authService: AuthService) {}

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe( user => {
            this.isAuthenticated = !!user;            
            console.log(this.isAuthenticated);
        });
    }
    onSave() {
        this.dataStorage.storeRecipes();
    }

    onFetch() {
        this.dataStorage.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logOut();
    }
    
}
