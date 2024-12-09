/**
 * Component Props API
 *
 */
  <Button variant="contained" disableRipple size="large">
     Button *{" "}
  </Button>
<Paper sx={{ height: "120px" }} elevation={10}></Paper>;

/**
 * sx props kinda like inline styles with additional feature
 * shorthand for padding
 * Theme access
 * BreakPoints
 * pseudo Selectors
 */

<Button
 variant="contained" 
 disableRipple
  size="large"
	sx={{
		fontSize="1rem"
		"&:hover":{
			bgcolor: "orange",
		}
	}}
	>
     Button *{" "}
  </Button>

/**
 * u can seprate the styling by using styled function
 */

const DemoButton = styled(Button)(() => {
	return {
		backgroundColor: "orange",
		fontSize: "1rem",
		"&:hover": {
			background: "red",
		}
	}
})

return (
	<DemoButton disableRipple disableElevation>
		click me
	</DemoButton>
);

/**
 * css modules / css
 */

<Button
	className={styles.ctaStyle}
>
Click Me
</Button>

/**
 * 
 */

const DemoPage = () => {
	const theme =  createTheme({
		components:{
			MuiPaper: {
				styleOverrides: {
					root: {
						padding: "14px",
						borderRadius: "12px"
					}
				}
			},
			MuiButton: {
				defaultProps: {
					disableRipple: true,
					disableElevation: true,
				}
			}
		}
	})
}

<ThemeProvider theme={theme}>
	<App/>
</ThemeProvider>

/**
 * palette: {
 * primary: deepOrange,
 * secondary: {
 * main: yellow[600]
 * }
 * }
 */

<Button
sx={{borderColor: "secondary.dark"}}
>

</Button>