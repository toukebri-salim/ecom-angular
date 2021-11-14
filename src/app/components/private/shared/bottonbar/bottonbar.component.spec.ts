import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonbarComponent } from './bottonbar.component';

describe('BottonbarComponent', () => {
  let component: BottonbarComponent;
  let fixture: ComponentFixture<BottonbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottonbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
