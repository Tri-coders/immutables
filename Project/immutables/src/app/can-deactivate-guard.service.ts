import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService {

  constructor() { }
  canDeactivate() {
    // you logic goes here, whatever that may be & must return either True or false
    var temp = window.confirm('If you click OK your test will end and will get auto submitted.\nClick cancel to continue giving test.');
    //alert(typeof(temp))
    return temp
  }
}
