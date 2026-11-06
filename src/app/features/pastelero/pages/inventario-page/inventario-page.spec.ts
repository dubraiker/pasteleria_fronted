import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioPage } from './inventario-page';

describe('InventarioPage', () => {
  let component: InventarioPage;
  let fixture: ComponentFixture<InventarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
