import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <mat-card class="summary-card">
        <mat-card-header>
          <mat-card-title>Resumo do Mês</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="summary-grid">
            <div class="summary-item">
              <h3>Total de Gastos</h3>
              <p>R$ {{ totalExpenses | number:'1.2-2' }}</p>
            </div>
            <div class="summary-item">
              <h3>Sua Parte</h3>
              <p>R$ {{ yourShare | number:'1.2-2' }}</p>
            </div>
            <div class="summary-item">
              <h3>Parte do Cônjuge</h3>
              <p>R$ {{ spouseShare | number:'1.2-2' }}</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="actions">
        <button mat-raised-button color="primary" (click)="openExpenseForm()">
          Adicionar Despesa
        </button>
      </div>

      <app-expense-list></app-expense-list>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    .summary-card {
      margin-bottom: 20px;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 20px;
    }
    .summary-item {
      text-align: center;
    }
    .actions {
      margin-bottom: 20px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalExpenses = 0;
  yourShare = 0;
  spouseShare = 0;

  constructor(
    private dialog: MatDialog,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      this.yourShare = this.totalExpenses / 2;
      this.spouseShare = this.totalExpenses / 2;
    });
  }

  openExpenseForm() {
    this.dialog.open(ExpenseFormComponent, {
      width: '400px'
    });
  }
}