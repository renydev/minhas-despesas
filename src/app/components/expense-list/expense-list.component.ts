import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Histórico de Despesas</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="expenses">
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Data</th>
            <td mat-cell *matCellDef="let expense">{{expense.date | date}}</td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Descrição</th>
            <td mat-cell *matCellDef="let expense">{{expense.description}}</td>
          </ng-container>

          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Valor</th>
            <td mat-cell *matCellDef="let expense">R$ {{expense.amount | number:'1.2-2'}}</td>
          </ng-container>

          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Categoria</th>
            <td mat-cell *matCellDef="let expense">{{expense.category}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let expense">{{expense.status}}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Ações</th>
            <td mat-cell *matCellDef="let expense">
              <button mat-icon-button (click)="markAsPaid(expense)" [disabled]="expense.status === 'paid'">
                <mat-icon>check_circle</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .mat-column-actions {
      width: 100px;
    }
  `]
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  displayedColumns = ['date', 'description', 'amount', 'category', 'status', 'actions'];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  markAsPaid(expense: Expense) {
    this.expenseService.markAsPaid(expense.id);
  }
}