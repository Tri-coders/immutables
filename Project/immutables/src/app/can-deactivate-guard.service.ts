import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService {

  constructor() { }
  async canDeactivate() {
    // you logic goes here, whatever that may be & must return either True or false
    //var temp = window.confirm('If you click OK your test will end and will get auto submitted.\nClick cancel to continue giving test.');
    //alert(typeof(temp))
    var temp = await Swal.fire({
      title: 'Are you sure?',
      text: "If you click OK your test will end and will get submitted.\nClick cancel to continue giving test.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      return (result.value)
    })
    return temp
  }
}
