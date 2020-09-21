import React, { useMemo } from "react";
import { useParams, Redirect } from "react-router-dom";
import { getHeroById } from "../selectors/getHeroById";

export const HeroeScreen = ({ history }) => {
  const { heroeId } = useParams();
  const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

  // const hero = getHeroById(heroeId);

  if (!hero) {
    return <Redirect to="/" />;
  }

  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
  } = hero;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`../assets//heroes/${heroeId}.jpg`}
          className="img-thumbnail animate__animated animate__fadeInLeft"
          alt={superhero}
        />
      </div>
      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-iten">
            <b>Alter ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-iten">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-iten">
            <b>First Appearance: </b>
            {first_appearance}
          </li>
        </ul>

        <h5>Characters</h5>
        <p>{characters}</p>

        <button
          className="btn btn-primary"
          onClick={() => {
            if (history.length <= 2) {
              history.push("/");
            } else {
              history.goBack();
            }
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};
