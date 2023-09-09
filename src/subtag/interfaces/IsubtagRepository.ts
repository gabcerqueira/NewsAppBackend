import { Subtag } from '../schema/subtag.schema';

export interface IsubtagRepository {
  create(tag: Subtag): Promise<Subtag>;

  findAll(): Promise<Subtag[]>;

  findById(id: string): Promise<Subtag | null>;

  update(category: Subtag): Promise<Subtag | null>;

  remove(id: string): Promise<boolean>;
}
