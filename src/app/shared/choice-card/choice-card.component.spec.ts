import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { ChoiceCardComponent } from './choice-card.component';

describe('ChoiceCardComponent', () => {
  let component: ChoiceCardComponent;
  let fixture: ComponentFixture<ChoiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceCardComponent ],
      imports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.people = [{
      "name": "test",
      "lastName": "test",
      "age": 20,
      "photo": "assets/img/1.jpg",
    }]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checkForEmptiness()', () => {
    it('should set isEmpty to true', () => {
      component.people = [];
      component.isEmpty = false;

      component.checkForEmptiness();

      expect(component.isEmpty).toBeTrue();
    });
  });

  describe('Like()', () => {
    it('should set gotMatch var to true', () => {
      component.gotMatch = false;

      component.like();

      expect(component.gotMatch).toBeTrue();
    });
  });

  describe('Dislike()', () => {
    it('should check if there is only one person in array', () => {
      spyOn(component, 'dislike').and.callFake(() => {
        if (component.people.length === 1) component.isEmpty = true;
      })

      expect(component.people.length).toBe(1);
      expect(component.isEmpty).toBeTrue()
    });

    it('should remove element from array if there are more than 2 persons', () => {
      component.people = [{
        "name": "test",
        "lastName": "test",
        "age": 20,
        "photo": "assets/img/1.jpg",
      },{
        "name": "test2",
        "lastName": "test2",
        "age": 22,
        "photo": "assets/img/2.jpg",
      }]
      component.counter = 0;
      const prevPeopleLength = component.people.length;

      spyOn(component, 'dislike').and.callFake(() => {
        if (component.people.length > 1) component.people.splice(component.counter, 1);
      })
      component.dislike();

      expect(prevPeopleLength).toBeGreaterThan(1);
      expect(prevPeopleLength).not.toBe(component.people.length);
    });

    it('if there is no person with such index in array', () => {
      component.people = [{
        "name": "test",
        "lastName": "test",
        "age": 20,
        "photo": "assets/img/1.jpg",
      },{
        "name": "test2",
        "lastName": "test2",
        "age": 22,
        "photo": "assets/img/2.jpg",
      }];
      const counter = component.counter = 2;

      spyOn(component, 'dislike').and.callFake(() => {
        if (!component.people[component.counter]) component.counter--;
      })
      component.dislike();

      expect(component.counter).toBe(1);
      expect(!component.people[component.counter]).not.toBeTruthy();
    });
  });

  describe('Continue()', () => {
    it('should increment counter by 1', () => {
      component.counter = 0;
      component.people = [{
        "name": "test",
        "lastName": "test",
        "age": 20,
        "photo": "assets/img/1.jpg",
      },{
        "name": "test2",
        "lastName": "test2",
        "age": 22,
        "photo": "assets/img/2.jpg",
      }];

      component.continue();

      expect(component.counter).toBe(1);
    });

    it('should set gotMatch to false wherever its true', () => {
      component.counter = 0
      component.gotMatch = true;

      component.continue();

      expect(component.gotMatch).toBeFalse();
    });

    it('should counter to 0 if there is no person with such index', () => {
      component.counter = 2

      component.continue();

      expect(component.counter).toBe(0);
    });

    it('should assign person to a currentPerson variable if there any', () => {
      component.people = [{
        "name": "test",
        "lastName": "test",
        "age": 20,
        "photo": "assets/img/1.jpg",
      },{
        "name": "test2",
        "lastName": "test2",
        "age": 22,
        "photo": "assets/img/2.jpg",
      }]
      component.counter = 0;

      component.continue();

      expect(component.currentPerson).not.toBeUndefined();
    });
  });
});
