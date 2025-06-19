import {And, Equal, ILike, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not} from 'typeorm';
import {operatorType} from '../core/enums';
import {OperationalErrors} from '../core/errors';
import {escapeSpecialCharactersFromStr} from '../helpers/utils.helper';
import {QueryParamsSchema, TQueryParams} from '../schemas/query_params.schema';

export class QueryParamsModel implements TQueryParams {
  l;
  p;
  f;
  s;
  t;
  constructor(query: TQueryParams) {
    this.validate(query);
  }

  private validate(query: any) {
    try {
      if (query.p) query.p = parseInt(query.p);
      if (query.l) query.l = parseInt(query.l);
      const parsedData = QueryParamsSchema.parse(query);

      Object.assign(this, parsedData);
    } catch (err) {
      throw new OperationalErrors.ValidationError(err);
    }
  }

  get orders() {
    if (this.s) {
      const sortResult = {};
      const sortItems = Array.isArray(this.s) ? this.s : [this.s];
      sortItems.forEach((sortItem: string) => {
        const [key, direction] = sortItem.split(':');
        sortResult[key] = direction;
      });

      return sortResult;
    }
  }

  get filters() {
    const selector = {};
    if (this.f) {
      const filters = Array.isArray(this.f) ? this.f : [this.f];
      for (const filter of filters) {
        const [key, operator, value] = filter.split(':');
        switch (operator.toLowerCase()) {
          case operatorType.like: {
            const ormFilter = this._likeOperator(value, operatorType.like);
            selector[key] = selector[key] ? [...selector[key], ormFilter] : [ormFilter];
            break;
          }
          case operatorType.iLike: {
            const ormFilter = this._likeOperator(value, operatorType.iLike);
            selector[key] = selector[key] ? [...selector[key], ormFilter] : [ormFilter];
            break;
          }
          case operatorType.equal: {
            const ormFilter = Equal(value);
            selector[key] = selector[key] ? [...selector[key], ormFilter] : [ormFilter];
            break;
          }
          case operatorType.notEqual: {
            const ormFilter = Not(Equal(value));
            selector[key] = selector[key] ? [...selector[key], ormFilter] : [ormFilter];
            break;
          }
          case operatorType.greaterThan: {
            const ormFilter = MoreThan(value);
            selector[key] = selector[key] ? [...selector[key], ormFilter] : [ormFilter];
            break;
          }
          case operatorType.greaterThanOrEqual: {
            const ormFilter = MoreThanOrEqual(value);
            selector[key] = selector[key] ? [...selector[key], ormFilter] : [ormFilter];
            break;
          }
          case operatorType.lessThan: {
            const ormFilter = LessThan(value);
            selector[key] = selector[key] ? [...selector[key], ormFilter] : [ormFilter];
            break;
          }
          case operatorType.lessThanOrEqual: {
            const ormFilter = LessThanOrEqual(value);
            selector[key] = selector[key] ? [...selector[key], ormFilter] : [ormFilter];
            break;
          }
          default:
            throw new Error(`Invalid filter type: ${operator}`);
        }
      }
    }

    for (const key in selector) {
      if (selector[key].length > 1) {
        selector[key] = And(...selector[key]);
      } else {
        selector[key] = selector[key][0];
      }
    }

    if (Object.keys(selector).length) return selector;
  }

  private _likeOperator(value, operator: operatorType) {
    const escapedValue = escapeSpecialCharactersFromStr(value);
    switch (operator) {
      case operatorType.like:
        return Like(`%${escapedValue}%`);
      case operatorType.iLike:
        return ILike(`%${escapedValue}%`);
      default:
        throw new Error(`Invalid filter type: ${operator}`);
    }
  }
}
