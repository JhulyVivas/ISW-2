import Boom from '@hapi/boom';
import HttpStatusCodes from 'http-status-codes';

const applyFiltersHandler = async (req, res, next) => {
  try {
    // eslint-disable-next-line
    console.log(req.files);
    const { body } = req;

    if (!body.filters) {
      throw Boom.badData('Filters not found');
    }

    let filters = [];
    try {
      filters = JSON.parse(body.filters);
    } catch (error) {
      throw Boom.badData('Filters not found');
    }

    const response = await req.container
      .processService.applyFilters({ filters, images: req.files });
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (error) {
    const err = Boom.isBoom(error) ? error : Boom.internal(error);
    return next(err);
  }
};
export default applyFiltersHandler;
