import { TestBed, inject } from '@angular/core/testing';

import { ListDishService } from './dish-order.service';

describe('ListDishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListDishService]
    });
  });

  it('should be created', inject([ListDishService], (service: ListDishService) => {
    expect(service).toBeTruthy();
  }));
});
