import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../domain/entities/group.entity';
import { Repository } from 'typeorm';

@ApiTags('Group')
@Controller('groups')
export class GroupController {
    constructor(@InjectRepository(Group) private readonly groups: Repository<Group>) {}

    @Get(':id')
    fetch(@Param('id') id: number): Promise<Group> {
        return undefined;
        // return this.groups.findOneOrFail({ where: { id , owner: 'sajt'}  });
    }
}