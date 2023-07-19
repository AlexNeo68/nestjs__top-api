import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ID_INCORRECT } from 'src/pipes/id-validation.constants';

export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') return value;

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ID_INCORRECT);
    }
  }
}
