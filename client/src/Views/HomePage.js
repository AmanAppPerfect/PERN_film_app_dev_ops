import { Button, Stack, Snackbar } from "@mui/material";
import { useReducer, useContext } from "react";

import SignInForm from "./Forms/SignInForm";
import SignUpForm from "./Forms/SignUpForm";
import myContextHome from "../Context";

import Alert from "@mui/material/Alert";

function handlerModals(modalState, actions) {
	switch (actions.modalType) {
		case "signUp": {
			return {
				...modalState,
				signUpModal: actions.task == "toOpen" ? true : false,
			};
		}
		case "signIn": {
			return {
				...modalState,
				signInModal: actions.task == "toOpen" ? true : false,
			};
		}
		default:
			return modalState;
	}
}

function HomePage() {
	const [modalState, dispatch] = useReducer(handlerModals, {
		signInModal: false,
		signUpModal: false,
	});

	const appContext = useContext(myContextHome);

	return (
		<myContextHome.Provider
			value={{
				...appContext,
				modalState: modalState,
				dispatch: dispatch,
			}}>
			<Snackbar
				open={appContext.userData.type === "error" ? true : false}
				autoHideDuration={6000}
				onClose={() => {
					appContext.setUserData({});
				}}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}>
				<Alert
					onClose={() => {
						appContext.setUserData({});
					}}
					severity='error'
					sx={{ width: "100%" }}>
					{appContext.userData.message}
				</Alert>
			</Snackbar>

			<Stack spacing={2} direction='row' justifyContent="center" marginTop="50px">
				<Button
					variant='outlined'
					onClick={() => {
						dispatch({ modalType: "signUp", task: "toOpen" });
					}}>
					Sign UP
				</Button>

				<Button
					variant='outlined'
					onClick={() => {
						dispatch({ modalType: "signIn", task: "toOpen" });
					}}>
					Sign In
				</Button>
			</Stack>
			<SignInForm />
			<SignUpForm />
            
		</myContextHome.Provider>
	);
}

export default HomePage;
