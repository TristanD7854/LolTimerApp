import { Component, OnInit } from '@angular/core';
import { interval, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  /*
       const interval$ = interval(5000);
       setTimeout(() =>
       {
         interval$.subscribe(value => console.log(value));
       }, 3000);
       */
}
