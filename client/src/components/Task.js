//Formerly "Blog" Component

import React, { useContext } from "react";
import NoContent from "./Pin/NoContent";
import CreatePin from "./Pin/CreatePin";
import PinContent from "./Pin/PinContent";

import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import Context from "../context";

const Task = ({ classes }) => {
  const { state } = useContext(Context);
  const { draft, currentPin } = state;

  let TaskContent;
  if (!draft && !currentPin) {
    TaskContent = NoContent;
  } else if (draft && !currentPin) {
    TaskContent = CreatePin;
  } else if (!draft && currentPin) {
    TaskContent = PinContent;
  }

  return (
    <Paper className={classes.root}>
      <TaskContent />
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowX: "none",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center",
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll",
  },
};

export default withStyles(styles)(Task);
