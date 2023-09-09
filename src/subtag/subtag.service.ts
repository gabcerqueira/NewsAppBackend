import { BadRequestException, Injectable } from '@nestjs/common';
import { SubtagRepository } from './subtag.repository';
import { Subtag } from './schema/subtag.schema';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { SanitizedSubtag } from './dto/sanitizedSubtag';

@Injectable()
export class SubtagService {
  constructor(private readonly subtagRepository: SubtagRepository) {}

  async create(createsubTagDto: Subtag) {
    try {
      let tag = new Subtag();

      tag.value = createsubTagDto.value;

      let createdTag = await this.subtagRepository.create(tag);

      if (!createdTag) {
        throw new Error(ErrorMessages.subtag.ERROR_CREATING_SUBTAG);
      }

      return this.sanitizeSubtag(createdTag);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return (await this.subtagRepository.findAll()).map((tag) =>
        this.sanitizeSubtag(tag),
      );
    } catch (error) {
      throw new Error(ErrorMessages.tag.TAG_NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      let selectedTag = await this.subtagRepository.findById(id);

      if (!selectedTag) {
        throw new Error(ErrorMessages.tag.TAG_NOT_FOUND);
      }

      return this.sanitizeSubtag(selectedTag);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSubtagDto: Subtag) {
    try {
      let updatedTag = await this.subtagRepository.update(updateSubtagDto);

      if (!updatedTag) {
        throw new Error(ErrorMessages.tag.ERROR_UPDATING_TAG);
      }

      return this.sanitizeSubtag(updatedTag);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.subtagRepository.remove(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  sanitizeSubtag(subtag: Subtag): SanitizedSubtag {
    let sanitizedsubtag = new SanitizedSubtag();

    sanitizedsubtag._id = subtag._id;
    sanitizedsubtag.active = subtag.active;
    sanitizedsubtag.value = subtag.value;

    return sanitizedsubtag;
  }
}
