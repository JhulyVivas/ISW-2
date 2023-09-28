import Joi from 'joi';
import Boom from '@hapi/boom';
import { GREYSCALE_FILTER, NEGATIVE_FILTER, BLUR_FILTER } from '../../commons/constans.mjs';

class ProcessService {
  processRepository = null;

  payloadValidation = Joi.object({
    filters: Joi.array().required().min(1)
      .items(Joi.string().valid(NEGATIVE_FILTER, GREYSCALE_FILTER, BLUR_FILTER)),
    images: Joi.array().required().min(1),
  }).required();

  constructor({ processRepository, minioService }) {
    this.processsRepository = processRepository;
    this.minioService = minioService;
  }

  async applyFilters(payload) {
    try {
      await this.payloadValidation.validateAsync(payload);
    } catch (error) {
      throw Boom.badData(error.message, { error });
    }
    const Process = await this.processRepository.save(payload);
    return Process;
  }
}

export default ProcessService;