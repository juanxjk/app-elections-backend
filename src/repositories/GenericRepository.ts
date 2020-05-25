import * as typeorm from "typeorm";
import { getConnection } from "../libs/database/typeorm";
import { DeepPartial } from "typeorm";
import NotFoundError from "../errors/NotFoundError";

export interface Repository<T> {
  findByID(
    id: string | number,
    options?: typeorm.FindOneOptions<T>
  ): Promise<T>;

  findAll(options?: typeorm.FindManyOptions<T>): Promise<T[]>;

  findOne(query: T, options?: typeorm.FindOneOptions): Promise<T>;

  create(data: T): Promise<T>;

  update(id: string | number, data: DeepPartial<T>): Promise<T>;

  delete(id: string | number): Promise<boolean>;
}

export default class GenericRepository<T> implements Repository<T> {
  protected get repository(): Promise<typeorm.Repository<T>> {
    return (async () => {
      const con = await getConnection();
      const repository = con.getRepository(this.type);
      return repository;
    })();
  }

  constructor(private type: { new (): T }) {}

  async findByID(
    id: string | number,
    options?: typeorm.FindOneOptions<T> | undefined
  ): Promise<T> {
    const repository = await this.repository;
    const foundData = await repository.findOne(id, options);
    if (!foundData) throw new NotFoundError();
    return foundData;
  }

  async findAll(options?: typeorm.FindManyOptions<T>): Promise<T[]> {
    const repository = await this.repository;
    return await repository.find(options);
  }

  async findOne(
    query: typeorm.FindConditions<T>,
    options?: typeorm.FindOneOptions | undefined
  ): Promise<T> {
    const repository = await this.repository;
    const foundData = await repository.findOne(query, options);
    if (!foundData) throw new NotFoundError();
    return foundData;
  }

  async create(data: T): Promise<T> {
    const repository = await this.repository;
    return await repository.save(data);
  }

  async update(id: string | number, data: DeepPartial<T>): Promise<T> {
    const repository = await this.repository;
    const originalData = await repository.findOne(id);
    if (!originalData) {
      throw new NotFoundError();
    }
    const updateData = { ...originalData, ...data };
    const updatedData = repository.save(updateData);

    return updatedData;
  }

  async delete(id: string | number): Promise<boolean> {
    const repository = await this.repository;
    const foundData = await repository.findOne(id);
    if (!foundData) throw new NotFoundError();
    const result = await repository.softDelete(id);
    console.log(result);

    if (result.affected) return true;
    return false;
  }
}
