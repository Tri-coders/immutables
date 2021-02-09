import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
// import { DatasendService } from './datasend.service'

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

  constructor(private http: HttpClient, private router: Router) {  }

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
            //this.data.setSession(data.token)
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
            //this.data.setSession(data.token)
          }
          return data
        })
      )

      return request
    }

    public logout(): void{  
      this.token = ''
      window.localStorage.removeItem("userToken")
      this.router.navigateByUrl('/')
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

    public logsdata(logsdata: any): Observable<any>{
      if(logsdata.length!=0){
        console.log(logsdata)
        const base = this.http.post('/logsApi/logsdata',logsdata)
        const request = base.pipe(
          map((data: EmailResponse)=>{
            return data
          }),
          
        )
        return request
      }
    }
}
