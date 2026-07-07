import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ColorService } from './color.service';

@ApiTags('colors')
@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  @ApiOperation({ summary: 'Distinct color names (Color filter dropdown).' })
  @ApiOkResponse({ type: [String] })
  findAll(): Promise<string[]> {
    return this.colorService.findDistinctNames();
  }
}
