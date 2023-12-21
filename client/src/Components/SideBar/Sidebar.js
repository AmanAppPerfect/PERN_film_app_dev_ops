import React, { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";

import listOfLink from "../../data/listOfLinks";

import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemButton,
} from "@mui/material";

import sidebarStyles from "./Sidebar.module.css";

import { Link, Navigate, Outlet } from "react-router-dom";

import myContextApp from "../../Context"

import HomePage from "../../Views/HomePage"

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function MiniDrawer(props) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const myContextSidebar = useContext(myContextApp)

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	if (myContextSidebar.userData.type !== "userData") {
		return <Navigate path="/" element={<HomePage />} />
	}

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position='fixed' open={open}>
					<Toolbar sx={{ justifyContent: "space-between" }}>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{
								marginRight: 5,
								...(open && { display: "none" }),
							}}>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' noWrap component='div'>
							Movies Database
						</Typography>
						<Button
							edge='end'
							color='secondary'
							onClick={() => {
								window.localStorage.clear()
								myContextSidebar.setUserData({})
							}}
							variant='contained'>
							Log Out
						</Button>
					</Toolbar>
				</AppBar>
				<Drawer variant='permanent' open={open}>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<List>
						{listOfLink.map((item) => (
							<Link
								to={`/${item.id}`}
								className={sidebarStyles["navLink"]}>
								<ListItem
									key={item.id}
									disablePadding
									sx={{ display: "block" }}>
									<ListItemButton
										sx={{
											minHeight: 48,
											justifyContent: open
												? "initial"
												: "center",
											px: 2.5,
										}}>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open
													? 3
													: "auto",
												justifyContent:
													"center",
											}}>
											{item.icon}
										</ListItemIcon>
										<ListItemText
											primary={item.title}
											sx={{
												opacity: open
													? 1
													: 0,
											}}
										/>
									</ListItemButton>
								</ListItem>
							</Link>
						))}
					</List>
				</Drawer>
				<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					<Outlet />
				</Box>
			</Box>
		</>
	);
}
