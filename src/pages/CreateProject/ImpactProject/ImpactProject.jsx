import React, { useEffect, useState } from "react";
import FormPost from "../../../components/FormPost/FormPost";
import Select from "react-select";
import { getAllUsers } from "../../../services/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setExpertImpacted,
  setImpactOrganisation,
} from "../../../store/projectSlice";

function ImpactProject() {
  const [data, setdata] = useState([]);
  const [dataImpacted, setDataImpacted] = useState([]);
  const [dataExpert, setDataExpert] = useState([]);
  const [impact, setImpact] = useState("");
  const [isMissing, setIsMissing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleclickPrecedent = () => {
    navigate("/descriptionproject");
  };

  const handleInputChange = (e) => {
    setImpact(e);
  };
  const searchData = async () => {
    try {
      const userData = await getAllUsers();
      const listUser = userData.data;
      for (let i = 0; i < listUser.length; i++) {
        (listUser[i].label = (
          <div>
            <img
              className="selectorImg"
              src={listUser[i].avatar}
              alt="Image 1"
            />
            <span>
              {listUser[i].firstname} {listUser[i].lastname}
            </span>
          </div>
        )),
          (listUser[
            i
          ].value = `${listUser[i].firstname} ${listUser[i].lastname}`);
        listUser[i].avatar = `${listUser[i].avatar}`;
      }
      setdata(listUser);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    searchData();
  }, []);
  const handleUserSelectInpact = (setSelectedOptions) => {
    setDataImpacted(setSelectedOptions);
  };
  const handleUserSelectExpert = (setSelectedOptions) => {
    setDataExpert(setSelectedOptions);
  };
  const handleclick = () => {
    if (dataImpacted.length === 0 || dataExpert.length === 0 || impact === "") {
      setIsMissing(true);
    } else {
      setIsMissing(false);
      console.log("impact", impact);
      dispatch(setImpactOrganisation(impact));
      navigate("/settingsproject");
      const tabData = [];
      for (let i = 0; i < dataImpacted.length; i++) {
        tabData.push({
          post_id: null,
          user_id: dataImpacted[i].id,
          expert: false,
          impacted: true,
        });
      }
      for (let i = 0; i < dataExpert.length; i++) {
        let hasImpact = tabData.some((obj) => obj.user_id === dataExpert[i].id);
        if (!hasImpact) {
          console.log("dataExpert[i].id", dataExpert[i].id);
          tabData.push({
            post_id: null,
            user_id: dataExpert[i].id,
            expert: true,
            impacted: false,
          });
        } else {
          const index = tabData.findIndex(
            (obj) => obj.user_id === dataExpert[i].id
          );
          tabData[index].expert = true;
        }
      }
      dispatch(setExpertImpacted(tabData));
    }
  };
  return (
    <>
      <div className="header">
        <h1 className="headerTitle">Mon projet</h1>
        <ul>
          <li className="notCurrentLi">Description</li>
          <img src="src/assets/Arrow01.png" alt="arrow"></img>
          <li className="currentLi">Impacts</li>
          <img src="src/assets/Arrow01.png" alt="arrow"></img>
          <li className="notCurrentLi">Réglages</li>
        </ul>
      </div>
      <article>
        <div className="articleText">
          <h2 className="c-blue">Son Impact</h2>
          <p className="c-blue">
            Votre projet peut avoir une influence sur de multiples profils
            d'invividu, il est temps de définir lesquels et pourquoi.
          </p>
        </div>
        <hr />
      </article>
      <div className="selector">
        <p className="c-blue">Personnes impactées</p>
        <Select options={data} onChange={handleUserSelectInpact} isMulti />
      </div>
      <div className="selector">
        <p className="c-blue">Personnes expertes</p>
        <Select options={data} isMulti onChange={handleUserSelectExpert} />
      </div>
      <div className="editor-container">
        <p className="c-blue">Impact sur l'organisation</p>
        <FormPost value={impact} onChange={(e) => handleInputChange(e)} />
      </div>
      {isMissing ? (
        <p class="missingFields">
          * Veuillez remplir tous les champs pour continuer
        </p>
      ) : (
        <div></div>
      )}
      <div className="nextPreviousButtons">
        <button className="blueButtonMulti" onClick={handleclickPrecedent}>
          PRECEDENT
        </button>
        <button className="blueButtonMulti" onClick={handleclick}>
          SUIVANT
        </button>
      </div>
    </>
  );
}
export default ImpactProject;
