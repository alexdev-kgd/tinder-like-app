import { Component } from '@angular/core';
import { IPerson } from './shared/choice-card/interfaces/person.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tinder-like-app';

  people: IPerson[] = [
    {
      name: 'Test',
      age: 20,
      photo: 'assets/img/1.jpg'
    },
    {
      name: 'Test2',
      age: 20,
      photo: 'assets/img/2.jpg'
    },
    {
      name: 'Test3',
      age: 20,
      photo: 'assets/img/3.jpg'
    },
  ]
}
