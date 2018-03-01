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
  public isEditable: boolean;
  public isEdited: boolean;

  constructor(elem: any) {
    this.id = elem.id || 0;
    this.userId = elem.userId;
    this.description = elem.description || '';
    this.amount = elem.amount || 0;
    this.comment = elem.comment || '';
    this.date = elem.date || new Date();
    this.isEditable = elem.isEditable || true;
    this.isEdited = elem.isEdited || true;
  }

  public toSave() {
    delete this.isEdited;
    delete this.isEditable;
    return this;
  }
}
