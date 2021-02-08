import * as typeorm from "typeorm";
import { getConnection } from "../libs/database/typeorm";
import { DeepPartial } from "typeorm";
import NotFoundError from "../errors/NotFoundError";

type FindOneOptions<T> = {
  withDeleted?: boolean;
  select?: (keyof T)[];
  relations?: string[];
  withRelations?: boolean;
};
type FindManyOptions<T> = FindOneOptions<T> & {
  page?: number;
  size?: number;
};
export interface Repository<T> {
  findByID(id: string | number, options?: FindOneOptions<T>): Promise<T>;

  findAll(options?: FindManyOptions<T>): Promise<T[]>;

  findOne(query: T, options?: FindOneOptions<T>): Promise<T>;

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

  async findByID(id: string | number, options?: FindOneOptions<T>): Promise<T> {
    const withDeleted = options?.withDeleted ?? false;
    const select = options?.select;
    const relations = options?.relations;
    const withRelations = options?.withRelations ?? false;

    const repository = await this.repository;
    const foundData = await repository.findOne(id, {
      withDeleted,
      select,
      relations,
      loadRelationIds: withRelations,
    });
    if (!foundData) throw new NotFoundError();
    return foundData;
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const page = options?.page ?? 1;
    const size = options?.size ?? 25;
    const withDeleted = options?.withDeleted ?? false;
    const select = options?.select;
    const relations = options?.relations;
    const withRelations = options?.withRelations ?? false;

    if (page < 0) throw new Error("'page' param must be greater than 0");
    if (size < 0) throw new Error("'size' param must be greater than 0");
    if (size > 25) throw new Error("'size' param can not be greater than 25");

    let skip = (page - 1) * size;
    let take = size;

    const repository = await this.repository;
    return await repository.find({
      skip,
      take,
      withDeleted,
      select,
      relations,
      loadRelationIds: withRelations,
    });
  }

  async findOne(
    query: typeorm.FindConditions<T>,
    options?: FindOneOptions<T>
  ): Promise<T> {
    const withDeleted = options?.withDeleted ?? false;
    const select = options?.select;
    const relations = options?.relations;
    const withRelations = options?.withRelations ?? false;

    const repository = await this.repository;
    const foundData = await repository.findOne(query, {
      withDeleted,
      select,
      relations,
      loadRelationIds: withRelations,
    });
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
