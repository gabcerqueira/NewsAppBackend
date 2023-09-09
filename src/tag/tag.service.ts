import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './schema/tag.schema';
import { TagRepository } from './tag.repository';
import { ErrorMessages } from 'src/shared/messages/ErrorMessages';
import { SanitizedTag } from './dto/sanitizedTag';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(createTagDto: Tag) {
    try {
      let tag = new Tag();

      tag.value = createTagDto.value;

      let createdTag = await this.tagRepository.create(tag);

      if (!createdTag) {
        throw new Error(ErrorMessages.tag.ERROR_CREATING_TAG);
      }

      return this.sanitizeTag(createdTag);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return (await this.tagRepository.findAll()).map((tag) =>
        this.sanitizeTag(tag),
      );
    } catch (error) {
      throw new Error(ErrorMessages.tag.TAG_NOT_FOUND);
    }
  }

  async findOne(id: string) {
    try {
      let selectedTag = await this.tagRepository.findById(id);

      if (!selectedTag) {
        throw new Error(ErrorMessages.tag.TAG_NOT_FOUND);
      }

      return this.sanitizeTag(selectedTag);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateTagDto: Tag) {
    try {
      let updatedTag = await this.tagRepository.update(updateTagDto);

      if (!updatedTag) {
        throw new Error(ErrorMessages.tag.ERROR_UPDATING_TAG);
      }

      return this.sanitizeTag(updatedTag);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.tagRepository.remove(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  sanitizeTag(tag: Tag): SanitizedTag {
    let sanitizedTag = new SanitizedTag();

    sanitizedTag._id = tag._id;
    sanitizedTag.active = tag.active;
    sanitizedTag.value = tag.value;

    return sanitizedTag;
  }
}
