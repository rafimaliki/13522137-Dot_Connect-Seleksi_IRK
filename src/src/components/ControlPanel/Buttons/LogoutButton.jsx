import React from "react";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";
import { LocalStorageRemove } from "../../../api/LocalStorage";

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = () => {
    LocalStorageRemove("player");
    LocalStorageRemove("playerList");

    navigate("/");
  };
  return <Button color="red" onclick={logout} title="Logout" />;
};

export default LogoutButton;
