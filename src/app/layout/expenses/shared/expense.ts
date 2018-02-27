export interface IExpense {
  id: number;
  userId: string;
  description: string;
  amount: number;
  comment: string;
  date: Date;
}

export class Expense implements IExpense {
  public id: number;
  public userId: string;
  public description: string;
  public amount: number;
  public comment: string;
  public date: Date;

  constructor(elem: any) {
    this.id = elem.id;
    this.userId = elem.userId;
    this.description = elem.description;
    this.amount = elem.amount;
    this.comment = elem.comment;
    this.date = elem.date;
  }
}
