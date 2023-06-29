import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPayComponent } from './my-pay.component';

describe('MyPayComponent', () => {
  let component: MyPayComponent;
  let fixture: ComponentFixture<MyPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
