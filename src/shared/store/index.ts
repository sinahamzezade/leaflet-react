import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';

const store = init({
  models,
  redux: {
    devtoolOptions: {},
  },
});

export default store;

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
