import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from 'typeorm';

@EventSubscriber()
export class CleanerSubscriber implements EntitySubscriberInterface {
  afterUpdate({entity}: InsertEvent<any>) {
    Object.keys(entity).forEach(prop => {
      if (entity[prop] === null || entity[prop] === '') delete entity[prop];
    });
  }

  afterInsert({entity}: InsertEvent<any>) {
    Object.keys(entity).forEach(prop => {
      if (entity[prop] === null || entity[prop] === '') delete entity[prop];
    });
  }
}
