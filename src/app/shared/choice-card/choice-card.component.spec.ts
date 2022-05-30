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

  describe('Remove()', () => {
    it('should check if there is only one person in array', () => {
      component.remove();

      expect(component.people.length).toBe(1);
      expect(component.isEmpty).toBeTrue()
    });

    it('should remove element from array if there are more than 1 person', () => {
      component.people = [{
        "name": "test",
        "age": 20,
        "photo": "assets/img/1.jpg",
      },{
        "name": "test2",
        "age": 22,
        "photo": "assets/img/2.jpg",
      }]
      component.counter = 0;
      const prevPeopleLength = component.people.length;

      component.remove();

      expect(prevPeopleLength).toBeGreaterThan(1);
      expect(prevPeopleLength).not.toBe(component.people.length);
    });

    it('if there is no person with such index in array', () => {
      component.people = [{
        "name": "test",
        "age": 20,
        "photo": "assets/img/1.jpg",
      },{
        "name": "test2",
        "age": 22,
        "photo": "assets/img/2.jpg",
      }];
      component.counter = 2;

      component.remove();

      expect(component.counter).toBe(1);
      expect(!component.people[component.counter]).not.toBeTruthy();
    });

    it('should assign person to a currentPerson variable if there any', () => {
      component.people = [{
        "name": "test",
        "age": 20,
        "photo": "assets/img/1.jpg",
      },{
        "name": "test2",
        "age": 22,
        "photo": "assets/img/2.jpg",
      }]
      component.counter = 0;

      component.remove();

      expect(component.currentPerson).not.toBeUndefined();
    });
  });

  describe('Continue()', () => {
    it('should set gotMatch to false wherever its true', () => {
      component.counter = 0
      component.gotMatch = true;

      spyOn(component, 'continue').and.callFake(() => {
        if (component.gotMatch) component.gotMatch = false;
      })
      component.continue();

      expect(component.gotMatch).toBeFalse();
    });
  });
});
