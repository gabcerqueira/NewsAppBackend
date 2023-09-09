import { Tag } from '../schema/tag.schema';

export interface ItagRepository {
  create(tag: Tag): Promise<Tag>;

  findAll(): Promise<Tag[]>;

  findById(id: string): Promise<Tag | null>;

  update(category: Tag): Promise<Tag | null>;

  remove(id: string): Promise<boolean>;
}
