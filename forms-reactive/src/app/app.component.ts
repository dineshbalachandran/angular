import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  signupForm: FormGroup;
  forbiddenUsernames = ['Test'];
  status = ['Stable', 'Critical', 'Finished'];
  defaultStatus = 1;

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        //'projectname': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'projectname': new FormControl(null, [Validators.required], this.forbiddenNamesAsync),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'projectStatus' : new FormControl(null)
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
    this.signupForm.setValue({
      'userData': {
        'projectname': 'Development',
        'email': 'max@test.com'
      },
      'projectStatus': 1
    });
    this.signupForm.patchValue({
      'userData': {
        'projectname': 'Dev Test',
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    //this.signupForm.reset();
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
  
  forbiddenNamesAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
