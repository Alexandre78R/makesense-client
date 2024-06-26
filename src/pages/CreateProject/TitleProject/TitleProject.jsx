import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreationGuide from "../../CreationGuide/CreationGuide";
import { useDispatch, useSelector } from "react-redux";
import { setTitle, setCountry } from "../../../store/projectSlice";
import CustomToast from "../../../components/CustomToast/CustomToast";

function TitleProject() {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [location, setLocation] = useState("");
  const auth = useSelector((state) => state.auth);
  const projectRedux = useSelector((state) => state.project);
  const navigate = useNavigate();
  const { showAlert } = CustomToast();

  const clickMe = () => {
    if (newTitle === "" || location === "") {
      showAlert("error", "Veuillez remplir tous les champs pour continuer ! ");
    } else if (newTitle.length > 100) {
      showAlert(
        "error",
        "Le format du titre dépasse la limite de caractères (100) autorisée. Veuillez raccourcir le titre."
      );
    } else {
      dispatch(setTitle(newTitle));
      dispatch(setCountry(location));
      navigate("/descriptionproject");

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!auth.user) {
      navigate("/login");
    }
    setNewTitle(projectRedux.title);
    setLocation(projectRedux.country);
  }, []);

  const options = [
    {
      value: "France",
      label: "FRANCE",
      icon: (
        <img
          src="../../src/assets/france.png"
          alt="France"
          className="custom_flag"
        />
      ),
    },
    {
      value: "Espagne",
      label: "ESPAGNE",
      icon: (
        <img
          src="../../src/assets/espagne.png"
          alt="Espagne"
          className="custom_flag"
        />
      ),
    },
    {
      value: "États-Unis",
      label: "ÉTATS-UNIS",
      icon: (
        <img
          src="../../src/assets/Etats-Unis.png"
          alt="Espagne"
          className="custom_flag"
        />
      ),
    },
    {
      value: "Liban",
      label: "LIBAN",
      icon: (
        <img
          src="../../src/assets/liban.png"
          alt="Espagne"
          className="custom_flag"
        />
      ),
    },
    {
      value: "Philippines",
      label: "PHILIPPINES",
      icon: (
        <img
          src="../../src/assets/philippines.png"
          alt="Espagne"
          className="custom_flag"
        />
      ),
    },
  ];

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    control: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      backgroundColor: "rgba(217, 217, 217, 0.2)",
      fontFamily: "raleway",
    }),
  };

  return (
    <>
      <div className="background_title_project">
        <div className="launch_project_containers">
          <h1 className="title_project">Titre du projet</h1>
          <input
            className="input_title_project"
            placeholder="Exemple : Du café gratuit pour tous !"
            color="white"
            type="text"
            id="name"
            name="name"
            required
            minlength="4"
            maxlength="128"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <div className="country_title_choise">
            <p className="title_css">Mon pays de résidence :</p>
          </div>
          <div className="selector_country">
            <Select
              options={options}
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
              getOptionLabel={(option) => (
                <div className="icons_title">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              )}
              getOptionValue={(option) => option.value}
              value={location}
              onChange={setLocation}
            />
          </div>
          <div className="button_launch_project">
            <button type="button" onClick={clickMe} className="launch_button ">
              DEMARRER
            </button>
          </div>
        </div>
      </div>
      <CreationGuide />
    </>
  );
}

export default TitleProject;
