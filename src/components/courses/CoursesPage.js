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
import axios from "axios";
//import loadingImg from "../images/LoadingImg.gif";

//declaring global variables to hold values of grid controls

var studentName_GRC = null;
var grade_GR = null;
var courseName_GR = null;
var comments_GR = null;
var lastId = 2;
const GridDataLimit = 5;
const isReadOnly=false;

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
      StudentsEnrolled: [
        {"studentID":1,"studentName":"Ram","grade":"King","courseName":"King","comments":"Good Lord!"},
        {"studentID":2,"studentName":"Student1","grade":"Student","courseName":"Stock Market","comments":"nice.."}
      ],
      countGrid: 2,
      selectedgrade: " ",
      selectedcourseName: " ",
      selectedComments: " ",

      isLocked: this.props.isLocked,
      showLoading: false,

      columns: [
        {
          title: "Student Name",
          field: "studentName",
          editComponent: (rowData) => (
            <TextField
              id="GRD_edit-studentName"
              variant="outlined"
              multiline
              defaultValue={rowData.rowData.studentName}
              onChange={this.handlestudentName}
              className={classes.formControlTextbox}
              size="small"
              autoFocus
            />
          ),
        },
        {
          title: "Grade",
          field: "grade",
          editComponent: (rowData) => (
            <TextField
              id="GRD_edit-grade"
              variant="outlined"
              multiline
              defaultValue={rowData.rowData.grade}
              onChange={this.handlegrade}
              className={classes.formControlTextbox}
              size="small"
            />
          ),
        },
        {
          title: "Course",
          field: "courseName",
          editComponent: (rowData) => (
            <TextField
              id="GRD_edit-courseName"
              variant="outlined"
              multiline
              defaultValue={rowData.rowData.courseName}
              onChange={this.handlecourseName}
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
              id="GRD_edit-comments"
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
            id="GRD_ADDBox"
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
            id="GRD_clear"
            {...props}
            ref={ref}
            className={this.state.isLocked ? classes.IconDisabled : null}
          />
        )),
        Delete: forwardRef((props, ref) => (
          <DeleteOutline
            {...props}
            id="GRD_DeleteOutline"
            ref={ref}
            className={this.state.isLocked ? classes.IconDisabled : null}
          />
        )),
        DetailPanel: forwardRef((props, ref) => (
          <ChevronRight {...props} id="GRD_ChevronRight" ref={ref} />
        )),
        Edit: forwardRef((props, ref) => (
          <Edit
            {...props}
            id="GRD_edit"
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
            id="GRD_Search"
            ref={ref}
            className={this.state.isLocked ? classes.IconDisabled : null}
          />
        )),
        Export: forwardRef((props, ref) => (
          <SaveAlt {...props} id="GRD_Export" ref={ref} />
        )),
        Filter: forwardRef((props, ref) => (
          <FilterList {...props} id="GRD_Filter" ref={ref} />
        )),
        FirstPage: forwardRef((props, ref) => (
          <FirstPage {...props} id="GRD_FirstPage" ref={ref} />
        )),
        LastPage: forwardRef((props, ref) => (
          <LastPage {...props} id="GRD_LastPage" ref={ref} />
        )),
        NextPage: forwardRef((props, ref) => (
          <ChevronRight {...props} id="GRD_NextPage" ref={ref} />
        )),
        PreviousPage: forwardRef((props, ref) => (
          <ChevronLeft {...props} id="GRD_PervPage" ref={ref} />
        )),
        ResetSearch: forwardRef((props, ref) => (
          <Clear {...props} id="GRD_ResetSearch" ref={ref} />
        )),

        SortArrow: forwardRef((props, ref) => (
          <ArrowDownward {...props} id="GRD_SortArrow" ref={ref} />
        )),
        ThirdStateCheck: forwardRef((props, ref) => (
          <Remove {...props} id="GRD_ThirdStateCheck" ref={ref} />
        )),
        ViewColumn: forwardRef((props, ref) => (
          <ViewColumn {...props} id="GRD_viewColumn" ref={ref} />
        )),
      },
    };
  }

  componentDidMount() {
    const gridData = JSON.parse(
      sessionStorage.getItem("StudentsGrid")
    );

    if (gridData === null) {
      this.getStudentsEnrolledData();
    } else {
      this.setState({
        StudentsEnrolled: gridData,
        countGrid: gridData.length,
      });
    }
    
    //Add Row Click event if clicked outside the icon but within the circle.
    if (document.getElementById("GRD_ADDBox") != null) {
      document
        .getElementById("GRD_ADDBox")
        .parentNode.parentNode.addEventListener("click", (event) => {
          this.onAddRowClick(event);
        });
    }
  }

  getStudentsEnrolledData() {
    //Call Get API with axios...
    const HTTP = axios.create({
      withCredentials: true,
    });

    //using token and credentials is upto your implementation..
    const userToken = "xxx";
    
    HTTP.get(
      "URL",
      {
        headers: {
          token: userToken,
        },
      }
    )
      .then((result) => {
        this.setState(
          {
            StudentsEnrolled: result.data,
            countGrid: result.data.length,
            showLoading: false,
          },
          () => {
            sessionStorage.setItem(
              "StudentsGrid",
              JSON.stringify(this.state.StudentsEnrolled)
            );
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  postStudentsEnrolledData(newData) {
    //Call Post API...
    sessionStorage.removeItem("StudentsGrid");
    const HTTP = axios.create({
      withCredentials: true,
    });
    const userToken = "xxx";
    HTTP.post("URL", newData, {
      headers: {
        token: userToken,
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((result) => {
        this.setState({ showLoading: true });
        this.resetStateData();
        this.getStudentsEnrolledData();
      })
      .catch((error) => {
        console.log(error);
        this.resetStateData();
      });    
  }

  deleteStudentsEnrolledData(oldData) {
    //Call Delete API...
    sessionStorage.removeItem("StudentsGrid");

    const HTTP = axios.create({
      withCredentials: true,
    });
    const userToken = "xxx";
    HTTP.delete(
      "URL",
      {
        headers: {
          token: userToken,
        },
      }
    )
      .then((result) => {
        this.getStudentsEnrolledData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlestudentName = (e) => {
    studentName_GRC = e.target.value;
  };

  handlegrade = (e) => {
    grade_GR = e.target.value;
    // this.setState({ selectedgrade: e.target.value });
  };
  handlecourseName = (e) => {
    courseName_GR = e.target.value;
    //this.setState({ selectedcourseName: e.target.value });
  };

  handleComments = (e) => {
    comments_GR = e.target.value;
    //this.setState({ selectedComments: e.target.value });
  };

  resetStateData() {
    studentName_GRC = null;
    courseName_GR = null;
    grade_GR = null;
    comments_GR = null;
  }
  canceledClicked() {
    //alert('hello')
    this.resetStateData();
  }
  onAddRowClick(event) {
    if (this.state.countGrid >= GridDataLimit) {
      alert(
        "You cannot add more than " + GridDataLimit + " Students to the list."
      );
      event.stopPropagation();
      return;
    }
  }

  onEditRowClick(event) {
    
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
         <div
            id={this.props.id}
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
              data={this.state.StudentsEnrolled}
              icons={this.state.tableIcons}
              isLoading={this.state.showLoading}
              style={{
                border: "2px solid gray",
                maxWidth: "1450px",
                overflow: "scroll",
                marginTop: "10px",
                marginLeft: "20px",
              }}
              editable={
                isReadOnly
                ? null
                : 
                {
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    newData.studentName =
                      studentName_GRC === null ? "" : studentName_GRC;
                    
                    newData.grade = grade_GR === null ? "" : grade_GR;

                    newData.courseName = courseName_GR === null ? "" : courseName_GR;

                    newData.comments = comments_GR === null ? "" : comments_GR;

                    var errorMsg = " ";

                    if (newData.studentName === "") {
                      errorMsg = "Please insert Student Name.";
                    }
                    if (newData.grade === "") {
                      errorMsg = errorMsg + "\nPlease insert grade.";
                    }
                    if (newData.courseName === "") {
                      errorMsg = errorMsg + "\nPlease insert course Name.";
                    }

                    if (errorMsg !== " ") {
                      reject();
                      alert(errorMsg);
                    } else if (this.state.countGrid >= GridDataLimit) {
                      reject();
                      alert(
                        "You cannot add more than " +
                          GridDataLimit +
                          " Students to the list."
                      );
                    } else {
                      this.setState({ showLoading: true });
                      this.postStudentsEnrolledData(newData);
                      resolve();
                    }
                    // }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    // setTimeout(() => {
                    //resolve();

                    if (oldData) {
                      newData.studentName =
                        studentName_GRC === null
                          ? oldData.studentName
                          : studentName_GRC === ""
                          ? ""
                          : studentName_GRC;

                      newData.grade =
                        grade_GR === null
                          ? oldData.grade
                          : grade_GR === ""
                          ? ""
                          : grade_GR;

                      newData.courseName =
                        courseName_GR === null
                          ? oldData.courseName
                          : courseName_GR === ""
                          ? ""
                          : courseName_GR;

                      newData.comments =
                        comments_GR === null
                          ? oldData.comments
                          : comments_GR === ""
                          ? ""
                          : comments_GR;

                      var errorMsg = " ";
                      if (newData.studentName === "") {
                        errorMsg = "Please insert Student Name.";
                      }
                      if (newData.grade === "") {
                        errorMsg = errorMsg + "\nPlease insert grade.";
                      }
                      if (newData.courseName === "") {
                        errorMsg = errorMsg + "\nPlease insert course Name.";
                      }
                      if (errorMsg !== " ") {
                        reject();
                        alert(errorMsg);
                      } else {
                        this.setState({ showLoading: true });
                        this.postStudentsEnrolledData(newData);
                        resolve();
                      }
                    }
                    // }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    // setTimeout(() => {
                    this.setState({ showLoading: true });
                    this.deleteStudentsEnrolledData(oldData);
                    resolve();
                    // }, 600);
                  }),
              }}
              options={{
                paging: false,
                sorting: false,
                draggable: false,
                addRowcourseName:"first",
                rowStyle: { backgroundColor: "#fff" },
              }}
            />
          </div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true }) (CoursesPage);
