import { Category } from '../../models/category.model';

export interface CategoryState {
  categories?: Category[];
  loading?: boolean;

  currentCategory?: Category;
}
