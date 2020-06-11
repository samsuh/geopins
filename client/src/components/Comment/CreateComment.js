import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import Divider from "@material-ui/core/Divider";

import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";
import { useClient } from "../../client";
import Context from "../../context";

const CreateComment = ({ classes }) => {
  const client = useClient();
  // const { state, dispatch } = useContext(Context); //not dispatched from here anymore (using pubsub)
  const { state } = useContext(Context);
  const [comment, setComment] = useState("");

  const handleSubmitComment = async () => {
    const variables = { pinId: state.currentPin._id, text: comment };
    // const { createComment } = await client.request( //disaptched from Maps.js now, so don't need to hold client.request
    await client.request(CREATE_COMMENT_MUTATION, variables);
    // dispatch({ type: "CREATE_COMMENT", payload: createComment }); //dispatched in <Subscription> in Maps.js
    setComment("");
  };

  return (
    <>
      <form className={classes.form}>
        <IconButton
          disabled={!comment.trim()}
          className={classes.clearButton}
          onClick={() => setComment("")}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Add Comment"
          multiline={true}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <IconButton
          disabled={!comment.trim()}
          className={classes.sendButton}
          onClick={handleSubmitComment}
        >
          <SendIcon />
        </IconButton>
      </form>
      <Divider />
    </>
  );
};

const styles = (theme) => ({
  form: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  clearButton: {
    padding: 0,
    color: "red",
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark,
  },
});

export default withStyles(styles)(CreateComment);
