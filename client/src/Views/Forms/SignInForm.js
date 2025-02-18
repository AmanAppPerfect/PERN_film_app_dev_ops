import React, { useContext, useState } from "react";
import { Box, TextField, Stack, Modal, Button } from "@mui/material";
import myContext from "../../Context";

export default function SignInForm() {
	const context = useContext(myContext);
	// console.log(context);

	const [values, setValues] = useState({});

	async function signin() {
		const res = await fetch(`${context.BASE_URL}/signIn`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});
		const status = await res.json();
		console.table(status);
		context.setUserData(status);

		context.dispatch({ modalType: "signIn", task: "toClose" });
	}

	return (
		<Modal
			open={context.modalState["signInModal"]}
			onClose={() =>
				context.dispatch({ modalType: "signIn", task: "toClose" })
			}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			sx={{ display: "grid", placeContent: "center" }}>
			<Box
				component='form'
				sx={{
					"& .MuiTextField-root": { m: 1 },
					background: "white",
					width: "fit-content",
					padding: "10px 15px",
					borderRadius: "5px",
				}}
				noValidate
				autoComplete='off'>
				<Stack
					sx={{
						width: "100%",
						minWidth: {
							xs: "300px",
							sm: "360px",
							md: "400px",
						},
						gap: "1.5rem",
					}}>
					<TextField
						label='UserName'
						variant='outlined'
						type='text'
						name='username'
						onChange={(e) =>
							setValues({
								...values,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<TextField
						label='Password'
						type='password'
						autoComplete='current-password'
						name='user_password'
						onChange={(e) =>
							setValues({
								...values,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</Stack>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-evenly",
					}}>
					<Button
						onClick={() =>
							context.dispatch({
								modalType: "signIn",
								task: "toClose",
							})
						}>
						Cancel
					</Button>
					<Button
						onClick={() => signin(values)}
						color='secondary'
						variant='contained'>
						Sign In
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
