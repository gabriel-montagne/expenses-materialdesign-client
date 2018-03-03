import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesComponent } from './expenses.component';
import { PageHeaderModule } from '../../../shared/modules';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { ExpensesService } from '../shared/expenses.service';
import { HttpClientModule } from '@angular/common/http';
import { ExpensesActions } from '../shared/expenses.actions';
import { NgReduxModule } from '@angular-redux/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesComponent ],
      imports: [
        FormsModule,
        HttpClientModule,
        NgReduxModule,
        PageHeaderModule,
        RouterTestingModule,
        ToastModule.forRoot()
      ],
      providers: [
        ExpensesService,
        ExpensesActions
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
