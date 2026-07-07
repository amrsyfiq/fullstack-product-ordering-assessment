import { Controller, Get } from '@nestjs/common';
import { ColorService } from './color.service';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  /** Populates the Color filter dropdown with distinct color names. */
  @Get()
  findAll(): Promise<string[]> {
    return this.colorService.findDistinctNames();
  }
}
