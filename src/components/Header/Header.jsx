import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Box, styled } from "@mui/material";
import logo from "../../assets/img/icons/logo.png";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { push } from "redux-first-history";
import { HeaderMenus, ClosableDrawer } from "./index";

const CustomizedBox = styled(Box)`
  flex-grow: 1;
`;
const CustomizedMenuBar = styled(AppBar)`
  background-color: #fff;
  color: #444;
`;
const CustomizedToolBar = styled(Toolbar)`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`;
const CustomizedIconButtons = styled(Box)`
  margin: 0 0 0 auto;
`;

const Header = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <CustomizedBox component="div">
      <CustomizedMenuBar position="fixed">
        <CustomizedToolBar>
          <img
            className="c-header-logo"
            src={logo}
            alt="ロゴ"
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <CustomizedIconButtons component="div">
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </CustomizedIconButtons>
          )}
        </CustomizedToolBar>
      </CustomizedMenuBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </CustomizedBox>
  );
};

export default Header;
