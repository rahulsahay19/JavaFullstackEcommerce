import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  redirectUrl: string | null = null;
  apiUrl = 'http://localhost:8080/auth';
  private currentUserSource = new BehaviorSubject<User | null >(null);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }
  
  isAuthenticated(): boolean{
    //whether user is authenticated or not
    const token = localStorage.getItem('token');
    return !!token;
  }
  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      this.http
        .get<User>(`${this.apiUrl}/user`, { headers })
        .subscribe({
          next: (user) => {
            this.currentUserSource.next(user);
          },
          error: (error) => {
            console.error('Error decoding JWT token:', token);            
          }
        });
    }
  }
  
  login(values: any){
    return this.http.post<User>(this.apiUrl + '/login', values).pipe(
      map(user=>{
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }
  register(values: any){
    return this.http.post<User>(this.apiUrl + '/register', values).pipe(
      map(user=>{
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
  
}
