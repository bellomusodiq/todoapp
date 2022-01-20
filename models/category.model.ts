import {COLORS} from '../constants/colors';

export interface Category {
  id: number;
  title: string;
  color: string;
  noTask: number;
}

export interface CategoryModelInterface {
  _categories: Category[];
  getCategories: () => void;
  getCategoryById: (id: number) => any;
  addCategory: (title: string, color: string) => void;
  updateCategory: (id: number, title?: string, color?: string) => void;
  deleteCategory: (id: number) => void;
}

class CategoryModel implements CategoryModelInterface {
  _categories: Category[];
  constructor() {
    this._categories = [];
  }

  public getCategories() {
    return this._categories;
  }

  private _getCategoryById(id: number): Category | undefined {
    return this._categories.find((category: Category) => category.id === id);
  }

  public getCategoryById(id: number): Category | undefined {
    return this._getCategoryById(id);
  }

  public addCategory(title: string, color: string) {
    this._categories.push({
      id: this._categories.length,
      title: title,
      color: color,
      noTask: 0,
    });
  }

  public updateCategory(id: number, title?: string, color?: string) {
    const category: Category | undefined = this._getCategoryById(id);
    if (!category) return;
    if (title) {
      category.title = title;
    }
    if (color) {
      category.color = color;
    }
    return category;
  }

  public deleteCategory(id: number) {
    this._categories = this._categories.filter(
      (category: Category) => category.id !== id,
    );
    return this._categories;
  }
}

const categories = new CategoryModel();

// dummy data
categories.addCategory('Study for CHEM test', COLORS[0]);
categories.addCategory('Develop todo app', COLORS[1]);
categories.addCategory('Integrate unit test', COLORS[3]);

export default categories;
