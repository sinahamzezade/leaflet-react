import { createModel } from "@rematch/core";
import { RootState } from "..";
import produce from "immer";

export type Coordinate = [number, number] | null;

export type Location = {
  name: string;
  coordinate: Coordinate;
  type: string;
  image?: string;
  id: string;
};

const DEFAULT_FILTER_STATE = {
  coordinate: null,
  locations: [],
  editableMarkerId: "",
  showModal: false,
};

type Modify<T, R> = Omit<T, keyof R> & R;

type MapType = Modify<
  typeof DEFAULT_FILTER_STATE,
  {
    coordinate: Coordinate;
    locations: Location[];
    editableMarkerId: string | null;
    showModal: boolean;
  }
>;

const defaultStateWithType: MapType = DEFAULT_FILTER_STATE;

const mapsModel = createModel<RootState>()({
  effects: {},
  reducers: {
    setCoordinate(state, payload: Coordinate) {
      return produce(state, (draft) => {
        draft.coordinate = payload;
      });
    },
    toggleModal(state, payload: boolean) {
      return produce(state, (draft) => {
        draft.showModal = payload;
      });
    },
    addLocation(state, payload: Location) {
      return produce(state, (draft) => {
        draft.locations.push(payload);
      });
    },
    updateLocation(state, payload: Location & { index: number }) {
      return produce(state, (draft) => {
        draft.locations[payload.index].coordinate = payload.coordinate;
        draft.locations[payload.index].name = payload.name;
        draft.locations[payload.index].type = payload.type;
        draft.locations[payload.index].image = payload.image;
      });
    },
    removeLocation(state, payload: { index: number }) {
      return produce(state, (draft) => {
        draft.locations.splice(payload.index, 1);
      });
    },
    setEditableMarkerId(state, payload: string | null) {
      return produce(state, (draft) => {
        draft.editableMarkerId = payload;
      });
    },
  },
  state: defaultStateWithType,
});

export default mapsModel;
