import { SelectCategoriesDto } from '../dto/categoriesDto';
import { ClickNewsDto } from '../dto/clickNews';
import { RateNewsDto } from '../dto/rateNewsDto';
import { ReadingTimeDto } from '../dto/readingTime';
import { SanitizedUser } from '../dto/sanitizedUser';
import { User } from '../schema/user.schema';

export interface IuserController {
  create(user: User): Promise<SanitizedUser>;

  findAll(): Promise<SanitizedUser[]>;

  findOne(id: string): Promise<SanitizedUser>;

  update(id: string, user: User): Promise<SanitizedUser | null>;

  remove(id: string): Promise<boolean>;

  rateNews(rateNewsDto: RateNewsDto): Promise<User>;

  clickNews(clickNewsDto: ClickNewsDto): Promise<User>;

  addReadingTime(readingTimeDto: ReadingTimeDto): Promise<User>;

  selectCategories(categories: SelectCategoriesDto): Promise<User>;
}
