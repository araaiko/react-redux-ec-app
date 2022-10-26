import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { push } from "redux-first-history";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { TextInput } from "../UIkit";
import { isSignOut } from "../../reducks/users/operations";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const CustomizedDrawerWrapper = styled(Box)(
  ({ theme }) => `
    ${[theme.breakpoints.up("sm")]} {
        flex-shrink: 0;
        width: 256px;
    }
`
);
const CustomizedDrawer = styled(Drawer)`
  width: 256px;
`;

const CustomizedSearchField = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 32px;
`;

// const CustomizedOffset = styled("div")(({ theme }) => theme.mixins.toolbar);

const ClosableDrawer = (props) => {
  const { container } = props;
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback(
    (event) => {
      setKeyword(event.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event); // Headerから受け取った関数が入る。メニュークリック後、drawerが閉じるようにする。
  };

  const [filters, setFilters] = useState([
    {
      func: selectMenu,
      label: "すべて",
      id: "all",
      value: "/",
    },
    {
      func: selectMenu,
      label: "メンズ",
      id: "male",
      value: "/?gender=male",
    },
    {
      func: selectMenu,
      label: "レディース",
      id: "female",
      value: "/?gender=female",
    },
  ]);

  const menus = [
    {
      func: selectMenu,
      label: "商品登録",
      icon: <AddCircleIcon />,
      id: "register",
      value: "/product/edit", // selectMenuのpathに渡されるもの
    },
    {
      func: selectMenu,
      label: "注文履歴",
      icon: <HistoryIcon />,
      id: "history",
      value: "/order/history",
    },
    {
      func: selectMenu,
      label: "プロフィール",
      icon: <PersonIcon />,
      id: "profile",
      value: "/user/mypage",
    },
  ];

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("order", "asc"));

    getDocs(q).then((snapshots) => {
      const list = [];

      snapshots.forEach((snapshot) => {
        const category = snapshot.data();

        list.push({
          func: selectMenu,
          label: category.name,
          id: category.id,
          value: `/?category=${category.id}`,
        });
      });

      // 初期値に続けて今回のlistを追加する
      setFilters((prevState) => [...prevState, ...list]);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <CustomizedDrawerWrapper component="nav">
      <CustomizedDrawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          component="div"
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        >
          <CustomizedSearchField>
            <TextInput
              variant={"standard"}
              fullWidth={false}
              label={"キーワードを入力"}
              multiline={false}
              required={false}
              rows={1}
              value={keyword}
              type={"text"}
              onChange={inputKeyword}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </CustomizedSearchField>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem key={menu.id} disablePadding>
                <ListItemButton onClick={(e) => menu.func(e, menu.value)}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem key="logout" disablePadding>
              <ListItemButton
                onClick={(e) => {
                  dispatch(isSignOut());
                  props.onClose(e);
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem key={filter.id} disablePadding>
                <ListItemButton onClick={(e)=> filter.func(e, filter.value)}>
                  <ListItemText primary={filter.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </CustomizedDrawer>
    </CustomizedDrawerWrapper>
  );
};

export default ClosableDrawer;
