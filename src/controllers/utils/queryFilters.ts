import BadRequestError from "../../errors/BadRequestError";

export const getPagination = (
  page: number,
  size: number
): { skip: number; take: number } => {
  let skip = 0;
  let take = 10;

  if (page && size) {
    if (+page > 0 && +size > 0) {
      skip = (+page - 1) * +size;
      take = +size ?? 10;
    } else {
      throw new BadRequestError("Invalid values for 'page' or 'size'");
    }
  }
  return {
    skip,
    take,
  };
};
