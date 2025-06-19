import {Container} from 'typedi';
import {Database} from '../core/database';
import {EntityErrors} from '../core/errors';
import {QueryParamsModel} from '../models/query_params.model';

export class AbstractRepository<T> {
  database;

  constructor(protected readonly repoName) {
    this.database = Container.get(Database);
  }

  get repository() {
    return this.database.dataSource.getRepository(this.repoName);
  }

  async getById(id: string): Promise<T> {
    try {
      const result = await this.repository.findOneBy({id});
      if (!result) throw new Error('Item not found');
      return result;
    } catch (err) {
      throw new EntityErrors.ItemNotFoundError(err).withParams(this.repoName, id);
    }
  }

  async findOne(selector: any) {
    try {
      const result = await this.repository.findOneBy(selector);
      if (!result) throw new Error('Item not found');
      return result;
    } catch (err) {
      throw new EntityErrors.ItemNotFoundError(err).withParams(this.repoName);
    }
  }

  async find(selector: any) {
    try {
      const result = await this.repository.find(selector);
      if (!result) throw new Error('Item not found');
      return result;
    } catch (err) {
      throw new EntityErrors.ItemNotFoundError(err).withParams(this.repoName);
    }
  }

  async insert(data: T) {
    try {
      return await this.repository.insert(data);
    } catch (err) {
      throw new EntityErrors.ItemCreateError(err).withParams(this.repoName);
    }
  }

  async bulkInsert(data: T[], options?: {transaction?: any}) {
    try {
      return await this.repository.insert(data, {...options});
    } catch (err) {
      throw new EntityErrors.ItemsCreateError(err).withParams(this.repoName);
    }
  }

  async upsert(data: T, identifiers: string[]) {
    try {
      return await this.repository.upsert([data], {
        conflictPaths: identifiers,
        skipUpdateIfNoValuesChanged: true
      });
    } catch (err) {
      throw new EntityErrors.ItemUpsertError(err).withParams(this.repoName);
    }
  }

  async bulkUpsert(data: T[], identifiers: string[], options?: {transaction?: any}) {
    try {
      return await this.repository.upsert(data, {
        conflictPaths: identifiers,
        skipUpdateIfNoValuesChanged: true,
        ...options
      });
    } catch (err) {
      throw new EntityErrors.ItemUpsertError(err).withParams(this.repoName);
    }
  }

  async update(selector: any, data: T) {
    try {
      const updateResult = await this.repository.update(selector, data);
      if (updateResult.affected) {
        const updatedUser = await this.repository.findOneBy(selector);
        return updatedUser;
      } else {
        throw new Error(`Can't update item`);
      }
    } catch (err) {
      throw new EntityErrors.ItemUpdateError(err).withParams(this.repoName);
    }
  }

  async remove(selector: any) {
    try {
      await this.findOne(selector);
      return await this.repository.delete(selector);
    } catch (err) {
      throw new EntityErrors.ItemDeleteError(err).withParams(this.repoName);
    }
  }

  async count(selector?: any) {
    try {
      return await this.repository.countBy(selector);
    } catch (err) {
      throw new EntityErrors.ItemNotFoundError(err).withParams(this.repoName);
    }
  }

  async paginate(queryParams?: QueryParamsModel) {
    try {
      const ormQuery: any = {
        take: queryParams?.l || 100,
        skip: queryParams.p ? (queryParams.p - 1) * queryParams.l : 0
      };
      if (queryParams.orders) ormQuery.order = queryParams.orders;
      if (queryParams.filters) ormQuery.where = queryParams.filters;
      const [docs, count] = await Promise.all([this.repository.find(ormQuery), this.repository.count(ormQuery)]);

      return {
        count,
        docs
      };
    } catch (err) {
      throw new EntityErrors.ItemsNotFoundError(err).withParams(this.repoName);
    }
  }
}
