import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from 'typeorm';
import {Account} from './account.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'bigint', default: 0})
  score: number;

  @Column({type: 'bigint', default: 0})
  highScore: number;

  @Column({type: 'datetime', nullable: true})
  createdAt: Date;

  @ManyToOne(() => Account, account => account.games)
  @JoinColumn({name: 'accountId'})
  account: Relation<Account>;
}
