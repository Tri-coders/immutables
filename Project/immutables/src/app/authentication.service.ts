import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails{
  id: number
  name: string
  email: string
  password: string
  exp: number
  lat: number
}

interface TokenResponse {
  token: string
  userName: string
  error: string
  
}

interface EmailResponse {
  message: string
  error: string
}

interface quizResponse{
  quizes: JSON
  error: string
}

export interface TokenPayload{
  id: number
  name: string
  email: string
  password: string
}

export interface EmailData{
  phone: number
  name: string
  email: string
  message: string
}

export interface pdfData{
  name: string
}


@Injectable()
export class AuthenticationService {
  private token: string
  session=""
  userExsist = false
  sessionStartTime
  currentTimeMilliSec
  constructor(private http: HttpClient, private router: Router) {  }

  ///////////////Session ID//////////////////
  setSession(Session){
    this.session = Session
  }

  getSession(){
    return this.session
  }
///////////////Session ID//////////////////

  private saveToken (token: string): void{
    localStorage.setItem("userToken", token)
    this.token = token
  }

  private getToken (): string{
    if(!this.token){
      this.token = localStorage.getItem("userToken")
    }
    return this.token
  }

  public getUserDetails (): UserDetails{
    const token = this.getToken()
    let payload
    if(token){
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    }else{
      return null
    }
  }

    public isLoggedIn (): boolean {
      const user = this.getUserDetails()
      if(user){
        this.userExsist = true
        return user.exp > Date.now() / 1000
      }else{
        return false
      }
    }

    public register (user: TokenPayload): Observable<any> {
      const base = this.http.post('/users/register', user)
      
      const request = base.pipe(
        map((data: TokenResponse)=>{
          if(data.token){
            this.saveToken(data.token)
            this.setSession(data.token)
            var current = new Date()
            this.currentTimeMilliSec = current.getTime();
            this.sessionStartTime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
            
          }
          return data
        })
      )
      return request
    }

    public login(user: TokenPayload): Observable<any> {
      // console.log("AYA")
      const base = this.http.post('/users/login', user)
      
      const request = base.pipe(
        map((data:TokenResponse) => {
          if(data.token){
            this.saveToken(data.token)
            this.setSession(data.token)
            var current = new Date()
            this.currentTimeMilliSec = current.getTime();
            this.sessionStartTime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
            
          }
          return data
        })
      )

      return request
    }

    public logout(): void{  
      this.token = ''
      window.localStorage.removeItem("userToken")
      this.sendtoserver();
      this.userExsist = false;
      document.exitFullscreen();
      this.router.navigateByUrl('/Home')
    }

    public email(user: EmailData): Observable<any>{
      // console.log("AYA")
      const base = this.http.post('/users/email', user)
      
      const request = base.pipe(
        map((data:EmailResponse) => {
          if(data.message){
            return data
          }
          return data
        })
      )

      return request
    }

    public quiz(): Observable<any>{
      const base = this.http.get('/quiz/sample2')
      
      const request = base.pipe(
        map((data: quizResponse)=>{
          return data
        })
      )

      return request
    }

    public videoname(): Observable<any>{
      const base = this.http.get('/quiz/videoname')
      const request = base.pipe(
        map((data: EmailResponse)=>{
          return data
        })
      )
      return request
    }

    public pdfname(name: pdfData): Observable<any>{
      const base = this.http.post('/pdf/pdfname',name)
      const request = base.pipe(
        map((data: EmailResponse)=>{
          return data
        })
      )
      return request
    }

    sendtoserver(){
      try{
        var logsdata=["SessionLogs",this.session,"student1"]
        var current = new Date();
        var date = current.getDate().toString()+"/"+(current.getMonth()+1).toString()+"/"+current.getFullYear().toString()
        var sessionendtime = current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
        logsdata.push(date)
        logsdata.push(this.sessionStartTime)
        logsdata.push(sessionendtime)
        var totalTime = current.getTime()-this.currentTimeMilliSec
        logsdata.push(totalTime.toString())
        this.logsdata(logsdata)
          .subscribe(
            (data) => {
              if (data.error) {
                alert(data.error)
              } else {
                return
              }
            },
            error => {
              console.error(error)
            }
          )
      }catch(e){
        console.log(e)
        return
      }
    }

    public logsdata(logsdata: any): Observable<any>{
      if(logsdata.length!=0){
        //console.log(logsdata)
        const base = this.http.post('/logsApi/logsdata',logsdata)
        const request = base.pipe(
          map((data: EmailResponse)=>{
            return data
          }),
          
        )
        return request
      }
    }

    public planning(planningdata: any): Observable<any>{
      if(planningdata.length){
        const base = this.http.post('/planning/planning',planningdata)
        const request = base.pipe(
          map((data: EmailResponse)=>{
            return data
          }),
          
        )
        return request
      } 
    }

    public selfassesment(selfassesmentdata: any): Observable<any>{
      if(selfassesmentdata.length){
        const base = this.http.post('/inventory/answer',selfassesmentdata)
        const request = base.pipe(
          map((data: EmailResponse)=>{
            return data
          }),
          
        )
        return request
      } 
    }

    public report(data: any): Observable<any>{
      const base = this.http.post('/report/report',[data])
      const request = base.pipe(
        map((data: any)=>{
          return data
        }),
        
      )
      return request
    }  
    
}
