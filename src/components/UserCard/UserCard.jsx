import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/users";
import { deleteUtilisateur } from "../../services/users";
import { Link } from "react-router-dom";

function UserCard({ user, edit }) {
  const dispatch = useDispatch();
  const [visibleModal, setvisibleModal] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleClickDelete = () => {
    setvisibleModal(!visibleModal);
  };

  const handleClickCancel = () => {
    setvisibleModal(!visibleModal);
  };

  const handleClickFetch = async () => {
    try {
      await deleteUtilisateur(user.id);
      dispatch(removeUser(user.id));
      setvisibleModal(!visibleModal);
    } catch (err) {
      console.log("err", err);
      setErrMessage(
        "Nous rencontrons un problème, en espérant très vite(.js) chez MAKESENSE !",
      );
    }
  };

  return (
    <div className="card_admin_user">
      {user?.admin === 1 ? (
        <div className="admin_badge_admin_user">Adminstrateur</div>
      ) : (
        <div className="user_badge_admin_user">Utilisateur</div>
      )}
      <div className="avatar_container_admin_user">
        <img
          src={user?.avatar}
          alt={`Image de ${user?.firstname} ${user?.lastname}`}
          className="avatar_admin_user"
        />
      </div>
      <div className="info_admin_user">
        <h2 className="name_admin_user">
          {user?.firstname} {user?.lastname}
        </h2>
        <div>
          <p className="email_admin_user">Email: {user?.email}</p>
          <p className="phone_admin_user">
            Tel: {user?.tel ? user?.tel : "Aucune Information"}
          </p>
          <p className="country_admin_user">
            Pays:{" "}
            {user?.affiliated_site
              ? user?.affiliated_site
              : "Aucune Information"}
          </p>
        </div>
        <div>
          <p className="job_admin_user">
            <span className="tag_job_admin_user">{user?.job}</span>
          </p>
          <p className="role_admin_user">
            <span className="tag_role_admin_user">{user?.role}</span>
          </p>
        </div>
      </div>
      {edit ? (
        <div className="card_actions_admin_user">
          <Link to={`/admin/users/${user.id}`}>
            <span className="action_edit_admin_user" title="Modifier">
              &#x270E;
            </span>
          </Link>
          <span
            className="action_delete_admin_user"
            title="Supprimer"
            onClick={(e) => handleClickDelete()}
          >
            &#x2716;
          </span>
        </div>
      ) : (
        ""
      )}
      {visibleModal ? (
        <div id="modal_delete" class="modal">
          <div class="modal_content">
            {errMessage && <p className="p_error_modal">{errMessage}</p>}
            <h2>Confirmation de suppression</h2>
            <p>
              Voulez-vous vraiment supprimer l'utilisateur : {user?.firstname}{" "}
              {user?.lastname} ?
            </p>
            <div class="modal_buttons">
              <button id="btn_cancel" onClick={handleClickCancel}>
                Annuler
              </button>
              <button id="btn_confirm" onClick={handleClickFetch}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserCard;
