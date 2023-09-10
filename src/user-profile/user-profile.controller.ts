import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './schema/user-profile.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Módulo de User Profile')
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Criar user profile' })
  create(@Body() createUserProfileDto: UserProfile) {
    return this.userProfileService.create(createUserProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Recuperar todos os user profiles' })
  findAll() {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recuperar user profile' })
  findOne(@Param('id') id: string) {
    return this.userProfileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar user profile' })
  update(@Param('id') id: string, @Body() updateUserProfileDto: UserProfile) {
    return this.userProfileService.update(id, updateUserProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover user profile' })
  remove(@Param('id') id: string) {
    return this.userProfileService.remove(id);
  }
}
