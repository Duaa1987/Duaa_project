import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

/*
  Generated class for the HomeworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeworkProvider {
  public homeworkListRef: Reference;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.homeworkListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/eventList/homeworkList`);
      }
    });
  }

  createHomework(
    homeworkName: string,
    homeworktId: number
  ): ThenableReference {
    return this.homeworkListRef.push({
      name: homeworkName,
      Id: homeworktId * 1,
    });
  }


  getEventList(): Reference {
    return this.homeworkListRef;
  }

  getEventDetail(eventId: string): Reference {
    return this.homeworkListRef.child(eventId);
  }

}
