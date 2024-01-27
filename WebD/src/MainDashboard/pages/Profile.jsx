import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAuth0 } from "@auth0/auth0-react";

const styles = {
	details: {
		padding: "1em",
		borderTop: "1px solid #e1e1e1",
	},
	value: {
		padding: "1rem 2rem",
		borderTop: "1px solid #e1e1e1",
		color: "#899499",
	},
};

const Profile = () => {
	const { user, isLoading } = useAuth0();
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [apiKey, setApiKey] = useState("");
	const [apiSecret, setApiSecret] = useState("");

	if (isLoading) {
		return <div>Loading</div>;
	}

	useEffect(() => {
		// Fetch user's API key and API secret when component mounts
		const fetchUserKeys = async () => {
			try {
				const response = await fetch(`/api/keys/${user.email}`);
				const data = await response.json();
				if (data.success) {
					setApiKey(data.apiKey);
					setApiSecret(data.apiSecretKey);
				} else {
					console.error("Failed to fetch user keys:", data.message);
				}
			} catch (error) {
				console.error("Error fetching user keys:", error);
			}
		};

		fetchUserKeys();
	}, []);

	const handleUpdateButtonClick = () => {
		setShowUpdateForm(true);
	};

	const handleSaveChanges = async () => {
		try {
			const response = await fetch("/api/updateKeys", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: user.email,
					apiKey: apiKey,
					apiSecretKey: apiSecret,
				}),
			});
			const data = await response.json();
			console.log(data);
			// Optionally, update state or show a success message
		} catch (error) {
			console.error("Error updating keys:", error);
			// Optionally, show an error message to the user
		}
	};

	return (
		<CssBaseline>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
					alignItems: "center",
				}}
			>
				<img
					alt="avatar"
					style={{
						width: "100%",
						height: "35vh",
						objectFit: "cover",
						objectPosition: "50% 50%",
					}}
					src="https://img.freepik.com/free-vector/dark-black-background-design-with-stripes_1017-38064.jpg?w=2000&t=st=1706340898~exp=1706341498~hmac=4d3391a909bb9392c18225949c9e98f5d6971c1d58c66e3c20332d19c9a67901"
				/>
				<Grid
					container
					direction={{ xs: "column", md: "row" }}
					spacing={4}
					justifyContent="center"
					alignItems="center"
					style={{
						position: "relative",
						marginTop: "-30vh",
					}}
				>
					<Grid
						item
						xs={12}
						md={6}
						justifyContent="center"
						alignItems="center"
					>
						<Card variant="outlined" sx={{ borderColor: "white" }}>
							<Grid
								container
								direction="column"
								alignItems="center"
								style={{
									color: "white",
									backgroundColor: "#20232a",
								}}
							>
								<Grid
									item
									sx={{ p: "1.5rem 0rem", textAlign: "center" }}
								>
									<Badge
										overlap="circular"
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "left",
										}}
									>
										<Avatar
											sx={{ width: 100, height: 100, mb: 1.5 }}
											src={user.picture}
											referrerPolicy="no-referrer"
										/>
									</Badge>
									<Typography variant="h6">{user.name}</Typography>
									<Typography color="white">Client</Typography>
								</Grid>
								<Grid container>
									<Grid item xs={6}>
										<Typography style={styles.details}>
											Email
										</Typography>
										<Typography style={styles.details}>
											API KEY
										</Typography>
										<Typography style={styles.details}>
											API SECRET
										</Typography>
									</Grid>
									<Grid item xs={6} sx={{ textAlign: "end" }}>
										<Typography style={styles.value}>
											{user.email}
										</Typography>
										<Typography style={styles.value}>
											{apiKey}
										</Typography>
										<Typography style={styles.value}>
											{apiSecret}
										</Typography>
									</Grid>
								</Grid>
								<Grid
									item
									style={styles.details}
									sx={{ width: "100%" }}
								>
									<Button
										variant="contained"
										onClick={handleUpdateButtonClick}
										sx={{
											width: "100%",
											p: 1,
											my: 2,
											backgroundColor: "#00c9d7",
											borderRadius: "10px",
										}}
									>
										Update Profile
									</Button>
								</Grid>
							</Grid>
						</Card>
					</Grid>

					{/* Form for updating profile */}
					{showUpdateForm && (
						<Grid
							item
							xs={12}
							md={4}
							justifyContent="center"
							alignItems="center"
						>
							<Card variant="outlined" sx={{ borderColor: "white" }}>
								<Grid
									container
									direction="column"
									alignItems="center"
									style={{
										color: "white",
										backgroundColor: "#20232a",
										padding: "1em",
									}}
								>
									<Typography
										variant="h6"
										style={{ marginBottom: "1em" }}
									>
										Update Profile
									</Typography>
									<TextField
										label="ALPACA API-KEY"
										variant="outlined"
										type="text"
										fullWidth
										style={{ color: "white", marginBottom: "1em" }}
										InputLabelProps={{
											style: { color: "white" },
										}}
										value={apiKey}
										onChange={(e) => setApiKey(e.target.value)}
									/>
									<TextField
										label="ALPACA API-SECRET"
										variant="outlined"
										type="password"
										fullWidth
										style={{ color: "white", marginBottom: "1em" }}
										InputLabelProps={{
											style: { color: "white" },
										}}
										value={apiSecret}
										onChange={(e) => setApiSecret(e.target.value)}
									/>
									<Grid
										item
										xs={12}
										style={{ width: "85%", marginBottom: "1em" }}
									>
										<Button
											variant="contained"
											fullWidth
											style={{
												color: "white",
												backgroundColor: "#00c9d7",
												width: "100%",
											}}
											onClick={handleSaveChanges}
										>
											Save Changes
										</Button>
									</Grid>
								</Grid>
							</Card>
						</Grid>
					)}
				</Grid>
			</div>
		</CssBaseline>
	);
};

export default Profile;
