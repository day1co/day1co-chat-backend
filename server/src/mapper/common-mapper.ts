import { DateUtil } from '@day1co/pebbles';

export const toModel = (view) =>
  Object.keys(view).reduce((model, key) => {
    switch (key) {
      case 'id':
      case 'createdAt':
      case 'updatedAt':
        break;
      default:
        model[key] = view[key];
        break;
    }
    return model;
  }, {});

export const toView = (model) => {
  return Object.keys(model).reduce((view, key) => {
    switch (key) {
      case 'createdAt':
      case 'updatedAt':
      case 'showAt':
      case 'hideAt':
        view[key] = DateUtil.format(DateUtil.parse(model[key]), { format: 'YYYY. MM. DD' });
        break;
      default:
        view[key] = model[key];
        break;
    }
    return model;
  }, {});
};

export const toViews = (models) => {
  return models.map((model) => toView(model));
};
