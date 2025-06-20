import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from 'typeorm';
import {Account} from './account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'bigint', default: 0})
  amount: number;

  @Column({type: 'varchar', length: 50, nullable: true})
  status: string;

  @Column({type: 'varchar', length: 50, nullable: true})
  txHash: string;

  @Column({type: 'datetime', nullable: true})
  createdAt: Date;

  @Column({type: 'datetime', nullable: true})
  updatedAt: Date;

  @ManyToOne(() => Account, account => account.transactions)
  @JoinColumn({name: 'accountId'})
  account: Relation<Account>;
}
