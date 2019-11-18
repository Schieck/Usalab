import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayDialogComponent} from './essay-dialog.component';

describe('EssayDialogComponent', () => {
  let component: EssayDialogComponent;
  let fixture: ComponentFixture<EssayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
