import { Coordinate } from "../shared/store/models/map";
import { useDispatch } from "react-redux";
import { Dispatch } from "../shared/store";

import "./style.css";

type Props = {
  type?: string;
  name?: string;
  coordinate?: Coordinate;
  id?: string;
  image?: string;
  closePopup: any;
};

const Content = ({ type, name, id, image, closePopup }: Props) => {
  const dispatch = useDispatch<Dispatch>();

  const onEditHandler = () => {
    if (id) {
      dispatch.map.setEditableMarkerId(id);
    }
  };

  return (
    <>
      <div className="content--container">
        <div>Location details</div>
        <div>
          <h4>Location name: {name}</h4>
          <p>Location type: {type}</p>
          <img src={image} alt="" width="100" />
        </div>
        <div className="content--actions">
          <button onClick={closePopup}>Close</button>
          {id && <button onClick={() => onEditHandler()}>Edit</button>}
        </div>
      </div>
    </>
  );
};

export default Content;
