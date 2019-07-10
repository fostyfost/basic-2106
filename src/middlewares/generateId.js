import uuid from "uuid/v4";

export default () => next => action => {
  if (!action.generateId) {
    return next(action);
  }

  next({
    ...action,
    id: uuid()
  });
};
