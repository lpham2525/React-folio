import React, { useState, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ModalCustomize from "../Navbar/ModalCustomize";

class SmartList extends Component {

  state = {
    item1: ""
  }

  handleItemSelection = () => {
    this.setState({ })
  }
}