import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "../../../components/UserCard/UserCard";
import Pagination from "../../../components/Pagination/Pagination";
import { sendUserData } from "../../../store/users";
import { getAllUsers } from "../../../services/users";
import SearchBarAdmin from "../../../components/SearchBarAdmin/SearchBarAdmin";

function UserManage() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminFilter, setAdminFilter] = useState(false);
  const [nonAdminFilter, setNonAdminFilter] = useState(false);

  const searchData = async () => {
    try {
      const usersData = await getAllUsers();
      dispatch(sendUserData(usersData.data));
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (!auth.user) return navigate("/login");
    searchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAdminFilter = (e) => {
    setAdminFilter(e.target.checked);
  };

  const handleNonAdminFilter = (e) => {
    setNonAdminFilter(e.target.checked);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const {
        email,
        role,
        job,
        tel,
        firstname,
        lastname,
        admin,
        affiliated_site,
      } = user;
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const emailMatch =
        email && email.toLowerCase().includes(lowerCaseSearchTerm);
      const roleMatch =
        role && role.toLowerCase().includes(lowerCaseSearchTerm);
      const jobMatch = job && job.toLowerCase().includes(lowerCaseSearchTerm);
      const telMatch = tel && tel.toLowerCase().includes(lowerCaseSearchTerm);
      const firstnameMatch =
        firstname && firstname.toLowerCase().includes(lowerCaseSearchTerm);
      const lastnameMatch =
        lastname && lastname.toLowerCase().includes(lowerCaseSearchTerm);
      const affiliated_siteMatch =
        affiliated_site &&
        affiliated_site.toLowerCase().includes(lowerCaseSearchTerm);

      const isMatch =
        emailMatch ||
        roleMatch ||
        jobMatch ||
        telMatch ||
        firstnameMatch ||
        affiliated_siteMatch ||
        lastnameMatch;

      if (adminFilter && nonAdminFilter) {
        return isMatch;
      } else if (adminFilter) {
        return isMatch && admin;
      } else if (nonAdminFilter) {
        return isMatch && !admin;
      } else {
        return isMatch;
      }
    });
  }, [users, searchTerm, adminFilter, nonAdminFilter]);

  useEffect(() => {
    setCurrentPageUsers(filteredUsers);
  }, [filteredUsers]);

  const setItems = (users) => {
    const filteredUsers = adminFilter
      ? users.filter((user) => user.admin)
      : nonAdminFilter
      ? users.filter((user) => !user.admin)
      : users;

    if (
      (filteredUsers.length === 0 && adminFilter) ||
      (filteredUsers.length === 0 && nonAdminFilter)
    ) {
      navigate("/admin/users", { replace: true });
    } else {
      setCurrentPageUsers(filteredUsers);
    }
  };

  return (
    <div className="box">
      <div className="container_admin_usermanage">
        <SearchBarAdmin
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          activedButton
          redirection="/admin/users/register"
          textButton="Ajouter un utilisateur"
        />
        <div className="filter_options">
          <label htmlFor="adminFilterCheckbox">
            <input
              type="checkbox"
              id="adminFilterCheckbox"
              checked={adminFilter}
              onChange={handleAdminFilter}
            />
            Afficher les administrateurs
          </label>
          <label htmlFor="nonAdminFilterCheckbox">
            <input
              type="checkbox"
              id="nonAdminFilterCheckbox"
              checked={nonAdminFilter}
              onChange={handleNonAdminFilter}
            />
            Afficher les non-administrateurs
          </label>
        </div>
        <div className="card_container_admin_user">
          {currentPageUsers.map((user) => (
            <UserCard user={user} key={user.id} edit />
          ))}
        </div>
        {users && (
          <div className="pagination_admin_username">
            <Pagination data={filteredUsers} setCurrentItems={setItems} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManage;
