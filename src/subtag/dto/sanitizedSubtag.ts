import { Types } from 'mongoose';
import { Subtag } from '../schema/subtag.schema';

type SanitizedClass = Pick<Subtag, '_id' | 'value' | 'active'>;

export class SanitizedSubtag implements SanitizedClass {
  _id: Types.ObjectId | string;
  value: string;
  active: boolean;
}
