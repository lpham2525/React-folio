import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ElementAPI from "../../utils/ElementAPI";
import UserTextBox from "../../components/UserTextBox";
import ElementContext from "../../utils/ElementContext";
import Button from "@material-ui/core/Button";
import TextBoxModal from "../../components/TextBoxModal";
import NavbarModal from "../../components/Modals/NavbarModal"
import UserNav from '../../components/UserNav'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const { getElements, createElement, updateElement, deleteElement } = ElementAPI;

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [elementState, setElementState] = useState({
    elements: [],
    type: '',
    attributes: {}

  });

  const signOut = () => {
    localStorage.removeItem('user');
    window.location = "/"
  }

  elementState.handleInputChange = (event) => {
    let newAttribute = { [event.target.name]: event.target.value }
    let attributes = { ...elementState.attributes, ...newAttribute };
    console.log(attributes)
    setElementState({
      attributes: attributes
    });
  }

  elementState.handleAddElement = (event, type) => {
    setOpen(true);

    // let elements = JSON.parse(JSON.stringify(elementState.elements));
    createElement({
      type: type,
      attributes: elementState.attributes
    })
      .then(({ data }) => {
        console.log(data)
        // elements.push(data);
        setElementState({ ...elementState, type: "", attributes: {} });
      })
      .catch((err) => console.error(err));
  };

  // elementState.handleUpdateElement = (id) => {
  //   updateElement(id)
  //     .then(() => {
  //       const elements = JSON.parse(JSON.stringify(elementState.elements));
  //       setElementState({ ...elementState, elements });
  //     })
  //     .catch((err) => console.error(err));
  // };

  elementState.handleDeleteElement = (id) => {
    deleteElement(id)
      .then(() => {
        const elements = JSON.parse(JSON.stringify(elementState.elements));
        const elementsFiltered = elements.filter(
          (element) => element._id !== id
        );
        setElementState({ ...elementState, elements: elementsFiltered });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getElements()
      .then(({ data }) => {
        setElementState({ ...elementState, elements: data });
      })
      .catch((err) => console.error(err));
  }, []);

  let elementArray = (elementState.elements) ? elementState.elements : null

  return (
    <ElementContext.Provider value={elementState}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <Button color="inherit" onClick={() => signOut()}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>

        {open ? (
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            {/* <TextBoxModal></TextBoxModal> */}
            <NavbarModal></NavbarModal>
          </Drawer>
        ) : null}

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Navbar Edit Section */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Navbar Edit Section
                    {
                      (elementArray) ? elementArray.filter(element => element.type == "navbar").map((navbar, i) => {
                        return <UserNav
                          siteTitle={navbar.attributes.siteTitle}
                          siteLink1={navbar.attributes.siteLink1}
                          siteLink2={navbar.attributes.siteLink2}
                          key={i}></UserNav>
                      }) : null
                    }
                  </Typography>
                </Paper>
              </Grid>
              {/* Header Edit Section */}
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Header Edit Section
                  </Typography>
                </Paper>
              </Grid>
              {/* Body Edit Section */}
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    {/* <UserTextBox></UserTextBox> */}
                  </Typography>
                </Paper>
              </Grid>

              {/* Footer Edit Section */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Footer Edit Section
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}></Box>
          </Container>
        </main>
      </div>
    </ElementContext.Provider>
  );
};

export default Dashboard
