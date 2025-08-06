import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmarterSolutionsComponent } from './smarter-solutions.component';

describe('SmarterSolutionsComponent', () => {
  let component: SmarterSolutionsComponent;
  let fixture: ComponentFixture<SmarterSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmarterSolutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmarterSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
