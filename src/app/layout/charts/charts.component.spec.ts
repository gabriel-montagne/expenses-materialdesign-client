import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared/modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartsModule } from 'ng2-charts';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ChartsComponent],
        imports: [
          ChartsModule,
          BrowserAnimationsModule,
          PageHeaderModule,
          RouterTestingModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
