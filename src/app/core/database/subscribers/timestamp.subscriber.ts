import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from 'typeorm';

@EventSubscriber()
export class TimeStampSubscriber implements EntitySubscriberInterface {
  beforeInsert({entity, metadata}: InsertEvent<any>) {
    delete entity.updatedAt;
    const createdAtColumn = metadata.columns.find(column => column.propertyName === 'createdAt');
    if (createdAtColumn) {
      entity.createdAt = new Date().toUTCString();
    }
  }

  beforeUpdate({entity, metadata}: UpdateEvent<any>) {
    delete entity.createdAt;
    const updatedAtColumn = metadata.columns.find(column => column.propertyName === 'updatedAt');
    if (updatedAtColumn) {
      entity.updatedAt = new Date().toUTCString();
    }
  }
}
