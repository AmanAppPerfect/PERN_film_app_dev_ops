import React, { useContext, useState } from "react";
import { Box, TextField, Stack, Modal, Button } from "@mui/material";
import myContext from "../../Context";

export default function SignUpForm() {
	const context = useContext(myContext);
	const [values, setValues] = useState({});

	async function signup() {
		context.setUserData({ ...values, type: "userData" });
		console.log(values);

		await fetch("http://server-service.server-ns.svc.cluster.local:5000/signUp", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});
		context.dispatch({ modalType: "signUp", task: "toClose" });
	}

	return (
		<Modal
			open={context.modalState["signUpModal"]}
			onClose={() =>
				context.dispatch({ modalType: "signUp", task: "toClose" })
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
						label='Age'
						variant='outlined'
						type='number'
						name='user_age'
						onChange={(e) =>
							setValues({
								...values,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<TextField
						label='First Name'
						variant='outlined'
						type='text'
						name='user_f_name'
						onChange={(e) =>
							setValues({
								...values,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<TextField
						label='Last Name'
						variant='outlined'
						type='text'
						name='user_l_name'
						onChange={(e) =>
							setValues({
								...values,
								[e.target.name]: e.target.value,
							})
						}
					/>
					<TextField
						label='Email'
						variant='outlined'
						type='email'
						name='user_email'
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
								modalType: "signUp",
								task: "toClose",
							})
						}>
						Cancel
					</Button>
					<Button
						onClick={() => signup()}
						color='secondary'
						variant='contained'>
						Sign UP
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
