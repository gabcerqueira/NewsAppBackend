import { Types } from 'mongoose';
import { Tag } from '../schema/tag.schema';

type SanitizedClass = Pick<Tag, '_id' | 'value' | 'active'>;

export class SanitizedTag implements SanitizedClass {
  _id: Types.ObjectId | string;
  value: string;
  active: boolean;
}
