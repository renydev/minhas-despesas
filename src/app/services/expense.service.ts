import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: 'pending' | 'paid';
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expenses.asObservable();

  addExpense(expense: Omit<Expense, 'id' | 'status'>) {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      status: 'pending'
    };
    
    const currentExpenses = this.expenses.getValue();
    this.expenses.next([...currentExpenses, newExpense]);
  }

  updateExpense(id: string, expense: Partial<Expense>) {
    const currentExpenses = this.expenses.getValue();
    const index = currentExpenses.findIndex(e => e.id === id);
    
    if (index !== -1) {
      const updatedExpenses = [...currentExpenses];
      updatedExpenses[index] = { ...updatedExpenses[index], ...expense };
      this.expenses.next(updatedExpenses);
    }
  }

  markAsPaid(id: string) {
    this.updateExpense(id, { status: 'paid' });
  }

  getExpenses() {
    return this.expenses$;
  }

  getTotalExpenses(): number {
    return this.expenses.getValue().reduce((sum, expense) => sum + expense.amount, 0);
  }
}