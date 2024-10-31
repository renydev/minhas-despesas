import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-form',
  template: `
    <form [formGroup]="expenseForm" (ngSubmit)="onSubmit()">
      <h2>Nova Despesa</h2>
      
      <mat-form-field appearance="fill">
        <mat-label>Descrição</mat-label>
        <input matInput formControlName="description">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Valor</mat-label>
        <input matInput type="number" formControlName="amount">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Data</mat-label>
        <input matInput type="date" formControlName="date">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Categoria</mat-label>
        <mat-select formControlName="category">
          <mat-option value="moradia">Moradia</mat-option>
          <mat-option value="alimentacao">Alimentação</mat-option>
          <mat-option value="transporte">Transporte</mat-option>
          <mat-option value="outros">Outros</mat-option>
        </mat-select>
      </mat-form-field>

      <div class="form-actions">
        <button mat-button type="button" (click)="cancel()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit">Salvar</button>
      </div>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding: 20px;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1em;
    }
  `]
})
export class ExpenseFormComponent {
  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private dialogRef: MatDialogRef<ExpenseFormComponent>
  ) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      this.expenseService.addExpense(this.expenseForm.value);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}