import React, { Fragment } from "react";
import MaterialTable, { MTableEditRow } from "material-table";
import TextField from "@material-ui/core/TextField";

import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { withStyles } from "@material-ui/core/styles";
//import loadingImg from "../images/LoadingImg.gif";

//declaring global variables to hold values of grid controls

var clientName_GRC = null;
var company_GR = null;
var position_GR = null;
var comments_GR = null;
const GridDataLimit = 5;

const styles = (theme) => ({
  IconDisabled: {
    color: "rgba(0, 0, 0, 0.26)",
    backgroundColor: "transparent",
    cursor: "default",
    pointerEvents: "none",
  },

  IconHidden: {
    display: "none",
    visibility: "hidden",
  },

  formControlTextbox: {
    height: "40px",
    width: "250px",
    margin: theme.spacing(1),
  },
  formControlAutopopulate: {
    height: "40px",
    width: "250px",
    margin: theme.spacing(1),
  },
});

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      ClientsSpokenTo: [
        {"clientsID":4225,"clientName":"Ram","company":"Ayodhya","position":"King","comments":"Jai Shri Ram!","userCPDRDataID":0,"createdBy":0,"createdOn":"0001-01-01T00:00:00","tableData":{"id":0}},
        {"clientsID":4226,"clientName":"Ramdev","company":"Patanjali","position":"CEO","comments":"aankh mare..","userCPDRDataID":0,"createdBy":0,"createdOn":"0001-01-01T00:00:00","tableData":{"id":1}}
      ],
      countGrid: 2,
      selectedCompany: " ",
      selectedPosition: " ",
      selectedComments: " ",

      isLocked: this.props.isLocked,
      showLoading: false,

      columns: [
        {
          title: "First Name",
          field: "clientName",
          editComponent: (rowData) => (
            <TextField
              id="GCST_edit-clientName"
              variant="outlined"
              multiline
              defaultValue={rowData.rowData.clientName}
              onChange={this.handleClientName}
              className={classes.formControlTextbox}
              size="small"
              autoFocus
            />
          ),
        },
        {
          title: "Last Name",
          field: "company",
          editComponent: (rowData) => (
            <TextField
              id="GCST_edit-company"
              variant="outlined"
              multiline
              defaultValue={rowData.rowData.company}
              onChange={this.handleCompany}
              className={classes.formControlTextbox}
              size="small"
            />
          ),
        },
        {
          title: "Course",
          field: "position",
          editComponent: (rowData) => (
            <TextField
              id="GCST_edit-position"
              variant="outlined"
              multiline
              defaultValue={rowData.rowData.position}
              onChange={this.handlePosition}
              className={classes.formControlTextbox}
              size="small"
            />
          ),
        },
        {
          title: "Comments",
          field: "comments",
          editComponent: (rowData) => (
            <TextField
              id="GCST_edit-comments"
              variant="outlined"
              multiline
              defaultValue={rowData.rowData.comments}
              onChange={this.handleComments}
              className={classes.formControlTextbox}
              size="small"
            />
          ),
        },
      ],
      tableIcons: {
        Add: props => (
          <AddBox
            id="GCST_ADDBox"
            {...props}
            style={{ backgroundColor: 'transparent' }}
            //className={classes.MuiIconButtonMargin}
            onClick={(event) => {
              this.onAddRowClick(event);
            }}
          />
        ),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => (
          <Clear
            id="GCST_clear"
            {...props}
            ref={ref}
            className={this.state.isLocked ? classes.IconDisabled : null}
          />
        )),
        Delete: forwardRef((props, ref) => (
          <DeleteOutline
            {...props}
            id="GCST_DeleteOutline"
            ref={ref}
            className={this.state.isLocked ? classes.IconDisabled : null}
          />
        )),
        DetailPanel: forwardRef((props, ref) => (
          <ChevronRight {...props} id="GCST_ChevronRight" ref={ref} />
        )),
        Edit: forwardRef((props, ref) => (
          <Edit
            {...props}
            id="GCST_edit"
            ref={ref}
            className={this.state.isLocked ? classes.IconDisabled : null}
            onClick={(event) => {
              this.onEditRowClick(event);
            }}
          />
        )),
        Search: forwardRef((props, ref) => (
          <Search
            {...props}
            id="GCST_Search"
            ref={ref}
            className={this.state.isLocked ? classes.IconDisabled : null}
          />
        )),
        Export: forwardRef((props, ref) => (
          <SaveAlt {...props} id="GCST_Export" ref={ref} />
        )),
        Filter: forwardRef((props, ref) => (
          <FilterList {...props} id="GCST_Filter" ref={ref} />
        )),
        FirstPage: forwardRef((props, ref) => (
          <FirstPage {...props} id="GCST_FirstPage" ref={ref} />
        )),
        LastPage: forwardRef((props, ref) => (
          <LastPage {...props} id="GCST_LastPage" ref={ref} />
        )),
        NextPage: forwardRef((props, ref) => (
          <ChevronRight {...props} id="GCST_NextPage" ref={ref} />
        )),
        PreviousPage: forwardRef((props, ref) => (
          <ChevronLeft {...props} id="GCST_PervPage" ref={ref} />
        )),
        ResetSearch: forwardRef((props, ref) => (
          <Clear {...props} id="GCST_ResetSearch" ref={ref} />
        )),

        SortArrow: forwardRef((props, ref) => (
          <ArrowDownward {...props} id="GCST_SortArrow" ref={ref} />
        )),
        ThirdStateCheck: forwardRef((props, ref) => (
          <Remove {...props} id="GCST_ThirdStateCheck" ref={ref} />
        )),
        ViewColumn: forwardRef((props, ref) => (
          <ViewColumn {...props} id="GCST_viewColumn" ref={ref} />
        )),
      },
    };
  }

  componentDidMount() {
    
  }

  getClientsSpokenToData() {
    //Call Get API...
  }

  postClientsSpokenToData(newData) {
    //Call Post API...
  }

  deleteClientsSpokenToData(oldData) {
    //Call Delete API...
  }

  handleClientName = (e) => {
    clientName_GRC = e.target.value;
  };

  handleCompany = (e) => {
    company_GR = e.target.value;
    // this.setState({ selectedCompany: e.target.value });
  };
  handlePosition = (e) => {
    position_GR = e.target.value;
    //this.setState({ selectedPosition: e.target.value });
  };

  handleComments = (e) => {
    comments_GR = e.target.value;
    //this.setState({ selectedComments: e.target.value });
  };

  resetStateData() {
    clientName_GRC = null;
    position_GR = null;
    company_GR = null;
    comments_GR = null;
    //this.storeActiveTabPanelValue("0");
  }
  canceledClicked() {
    //alert('hello')
    this.resetStateData();
  }
  onAddRowClick(event) {
    if (this.state.countGrid >= GridDataLimit) {
      alert(
        "You cannot add more than " + GridDataLimit + " Clients to the list."
      );
      event.stopPropagation();
      return;
    }
    //this.storeActiveTabPanelValue("ClientSpoken");
  }

  onEditRowClick(event) {
    //this.storeActiveTabPanelValue("ClientSpoken");
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
         <div
            id={this.props.id}
            className={this.state.isLocked ? classes.IconDisabled : null}
          >
            <MaterialTable
              components={{
                EditRow: (props) => {
                  return (
                    <MTableEditRow
                      {...props}
                      onEditingCanceled={(mode, rowData) => {
                        this.canceledClicked();
                        props.onEditingCanceled(mode);
                      }}
                    />
                  );
                },
              }}
              title=""
              columns={this.state.columns}
              data={this.state.ClientsSpokenTo}
              icons={this.state.tableIcons}
              isLoading={this.state.showLoading}
              style={{
                border: "2px solid gray",
                maxWidth: "1450px",
                overflow: "scroll",
                marginTop: "10px",
                marginLeft: "20px",
              }}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    // setTimeout(() => {
                    newData.clientName =
                      clientName_GRC === null ? "" : clientName_GRC;
                    newData.userCPDRDataID = this.props.userCPDRDataID;
                    newData.createdBy = Number(localStorage.getItem("userId"));
                    newData.company = company_GR === null ? "" : company_GR;

                    newData.position = position_GR === null ? "" : position_GR;

                    newData.comments = comments_GR === null ? "" : comments_GR;

                    var errorMsg = " ";

                    if (newData.clientName === "") {
                      errorMsg = "Please insert Client Name.";
                    }
                    if (newData.company === "") {
                      errorMsg = errorMsg + "\nPlease insert Company.";
                    }
                    if (newData.position === "") {
                      errorMsg = errorMsg + "\nPlease insert Position.";
                    }

                    if (errorMsg !== " ") {
                      reject();
                      alert(errorMsg);
                    } else if (this.state.countGrid >= GridDataLimit) {
                      reject();
                      alert(
                        "You cannot add more than " +
                          GridDataLimit +
                          " Clients to the list."
                      );
                    } else {
                      this.setState({ showLoading: true });
                      this.postClientsSpokenToData(newData);
                      resolve();
                    }
                    // }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    // setTimeout(() => {
                    //resolve();

                    if (oldData) {
                      newData.clientName =
                        clientName_GRC === null
                          ? oldData.clientName
                          : clientName_GRC === ""
                          ? ""
                          : clientName_GRC;

                      newData.company =
                        company_GR === null
                          ? oldData.company
                          : company_GR === ""
                          ? ""
                          : company_GR;

                      newData.position =
                        position_GR === null
                          ? oldData.position
                          : position_GR === ""
                          ? ""
                          : position_GR;

                      newData.comments =
                        comments_GR === null
                          ? oldData.comments
                          : comments_GR === ""
                          ? ""
                          : comments_GR;

                      newData.createdBy = Number(
                        localStorage.getItem("userId")
                      );

                      var errorMsg = " ";
                      if (newData.clientName === "") {
                        errorMsg = "Please insert Client Name.";
                      }
                      if (newData.company === "") {
                        errorMsg = errorMsg + "\nPlease insert Company.";
                      }
                      if (newData.position === "") {
                        errorMsg = errorMsg + "\nPlease insert Position.";
                      }
                      if (errorMsg !== " ") {
                        reject();
                        alert(errorMsg);
                      } else {
                        this.setState({ showLoading: true });
                        this.postClientsSpokenToData(newData);
                        resolve();
                      }
                    }
                    // }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    // setTimeout(() => {
                    this.setState({ showLoading: true });
                    this.deleteClientsSpokenToData(oldData);
                    resolve();
                    // }, 600);
                  }),
              }}
              options={{
                paging: false,
                sorting: false,
                draggable: false,
                addRowPosition:"first"
              }}
            />
          </div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true }) (CoursesPage);
