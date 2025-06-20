import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation} from 'typeorm';
import {Game} from './game.entity';
import {Transaction} from './transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 50, unique: true, nullable: true})
  address: string;

  @Column({type: 'bigint', default: 0})
  lockedBalance: number;

  @Column({type: 'bigint', default: 0})
  pendingBalance: number;

  @Column({type: 'datetime', nullable: true})
  createdAt: Date;

  @Column({type: 'datetime', nullable: true})
  updatedAt: Date;

  @OneToMany(() => Transaction, transaction => transaction.account, {onDelete: 'CASCADE'})
  transactions: Relation<Transaction>[];

  @OneToMany(() => Game, game => game.account, {onDelete: 'CASCADE'})
  games: Relation<Game>[];
}
