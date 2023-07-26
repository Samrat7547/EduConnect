import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryQuizComponent } from './category-quiz.component';

describe('CategoryQuizComponent', () => {
  let component: CategoryQuizComponent;
  let fixture: ComponentFixture<CategoryQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryQuizComponent]
    });
    fixture = TestBed.createComponent(CategoryQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
