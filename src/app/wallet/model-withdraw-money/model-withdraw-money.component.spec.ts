import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelWithdrawMoneyComponent } from './model-withdraw-money.component';

describe('ModelWithdrawMoneyComponent', () => {
  let component: ModelWithdrawMoneyComponent;
  let fixture: ComponentFixture<ModelWithdrawMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelWithdrawMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelWithdrawMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
