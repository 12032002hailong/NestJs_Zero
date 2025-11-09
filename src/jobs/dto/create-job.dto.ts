import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  logo: string;
}

export class CreateJobDto {
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Skills không được để trống' })
  @IsArray({ message: 'Skills có định dạng là array' })
  @IsString({ each: true, message: 'Skills có định dạng là string' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'Location không được để trống' })
  @IsString({ message: 'Location phải là chuỗi' })
  location: string;

  @IsNotEmpty({ message: 'Salary không được để trống' })
  @IsNumber({}, { message: 'Salary phải là số' })
  @Min(0, { message: 'Salary phải lớn hơn hoặc bằng 0' })
  salary: number;

  @IsNotEmpty({ message: 'Quantity không được để trống' })
  @IsNumber({}, { message: 'Quantity phải là số' })
  @Min(1, { message: 'Quantity phải lớn hơn hoặc bằng 1' })
  quantity: number;

  @IsNotEmpty({ message: 'Level không được để trống' })
  @IsString({ message: 'Level phải là chuỗi' })
  level: string;

  @IsNotEmpty({ message: 'Description không được để trống' })
  @IsString({ message: 'Description phải là chuỗi' })
  @MaxLength(500, { message: 'Description không được vượt quá 500 ký tự' })
  description: string;

  @IsNotEmpty({ message: 'StartDate không được để trống' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'StartDate phải có định dạng là ngày' })
  startDate: Date;

  @IsNotEmpty({ message: 'EndDate không được để trống' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'EndDate phải có định dạng là ngày' })
  endDate: Date;

  @IsNotEmpty({ message: 'isActive không được để trống' })
  @IsBoolean({ message: 'isActive phải là true hoặc false' })
  isActive: string;
}
