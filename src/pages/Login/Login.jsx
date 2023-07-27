import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../store/auth";
import authService from "../../services/auth";
import { Link } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [password, setPassword] = useState(false);
  const [error, setError] = useState(null);

  const showpassword = () => {
    setPassword(!password);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.login(login.email, login.password);
      dispatch(signin(result.data));

      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setError("email ou mot de passe incorrect");
      } else {
        setError(
          "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !"
        );
      }
    }
  };

  return (
    <div className="box_login">
      <div className="containers_login">
        <p className="title1_login c-blue">Pour acceder au site</p>
        <h1 className="title2_login">Connectez-vous</h1>
        {error && <p className="p_error_login">{error}</p>}
        <form className="form_login" onSubmit={handleSubmit}>
          <div className="input_courriel_login">
            <input
              className="icon_login courriel"
              type="email"
              name="email"
              id="email"
              placeholder="Courriel"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>

          <div className="input_password_login">
            <input
              className=" icon_login  password password_eye_login"
              type={password ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Mot de passe"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <img
              onClick={showpassword}
              className="oeil_login pointer"
              src="src/assets/Oeil.svg"
            />
          </div>

          <div className="checkbox_login">
          <input type="checkbox" id="cbtest" />
          <label for="cbtest" class="check-box"/>
          <p className="c-blue">Se souvenir de moi</p>
          </div>
            <button type="submit" className="connexion_login pointer">
              se connecter
            </button>
              <Link to="/forgotpassword" className="c-blue forgotPassword">Mot de passe oublié</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
