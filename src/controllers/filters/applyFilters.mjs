import Joi from 'joi';
import Boom from '@hapi/boom';
import Process from '../../models/Process.mjs';
import { GREYSCALE_FILTER, NEGATIVE_FILTER, BLUR_FILTER } from '../../commons/constans.mjs';

const PayloadValidation = Joi.object({
  // eslint-disable-next-line
  filters: Joi.array().required().min(1)
    .items(Joi.string().valid(NEGATIVE_FILTER, GREYSCALE_FILTER, BLUR_FILTER)),
  images: Joi.array().required().min(1),
}).required();

const applyFilters = async (payload) => {
  try {
    await PayloadValidation.validateAsync(payload);
  } catch (error) {
    throw Boom.badData(error.message, { error });
  }

  const newProcess = new Process();
  newProcess.filters = payload.filters;

  await newProcess.save();
  return newProcess;
};

export default applyFilters;
