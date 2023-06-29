import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyProfileComponent } from './add-my-profile.component';

describe('AddMyProfileComponent', () => {
  let component: AddMyProfileComponent;
  let fixture: ComponentFixture<AddMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
