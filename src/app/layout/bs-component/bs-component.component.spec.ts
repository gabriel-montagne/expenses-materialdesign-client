import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsComponentComponent } from './bs-component.component';
import { PageHeaderModule } from '../../shared';
import {
  AlertComponent, ButtonsComponent, CollapseComponent, DatePickerComponent, DropdownComponent, ModalComponent, PaginationComponent,
  PopOverComponent,
  ProgressbarComponent, RatingComponent,
  TabsComponent,
  TimepickerComponent,
  TooltipComponent
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';

describe('BsComponentComponent', () => {
  let component: BsComponentComponent;
  let fixture: ComponentFixture<BsComponentComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          BsComponentComponent,
          ButtonsComponent,
          AlertComponent,
          ModalComponent,
          CollapseComponent,
          DatePickerComponent,
          DropdownComponent,
          PaginationComponent,
          PopOverComponent,
          ProgressbarComponent,
          TabsComponent,
          RatingComponent,
          TooltipComponent,
          TimepickerComponent
        ],
        imports: [
          BrowserAnimationsModule,
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          NgbModule.forRoot(),
          RouterTestingModule,
          PageHeaderModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
