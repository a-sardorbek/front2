import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Cookie from "universal-cookie";
import Edit from "@mui/icons-material/EditRounded";
import Delete from "@mui/icons-material/Delete";
import { format as dateFormat } from "date-fns";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import eyeIcon from "../../Assets/ShowRoom/eye.svg";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import phoneClient from "fullstack-phone/client";
import {
  deleteInfo,
  editStatus,
  getInfos,
  getSingleInfo,
} from "../../Redux/both/infos";
import { motion } from "framer-motion";
import done_status from "../../Assets/Global/ready.svg";
import progress_status from "../../Assets/Global/cancelled.svg";
import "./table.css";
import {
  errorNotification,
  successNotification,
} from "../../Helpers/notification";

var phoneServer = require("fullstack-phone/server");

var metadata = phoneServer.loadMeta(["US", "RU", "UZ"]);

function Row({
  row,
  multipleUser,
  singleUser,
  currentPage,
  index,
  getFilteredData,
}) {
  const {
    firstName,
    lastName,
    houseNum,
    flatNum,
    address,
    created_date,
    phoneNumber,
    problem,
    responsibleProfession,
    status,
    systemUserInfoProfileDto,
    id,
    created_time,
  } = row;

  const { role } = useSelector((state) => state.users);
  const [open, setOpen] = React.useState(false);
  const [statusChange, setStatusChange] = React.useState(true);
  const [statusFiltered, setStatusFiltered] = React.useState(status);
  const location = useLocation();
  const dispatch = useDispatch();

  let urls = location.pathname;

  const handleDelete = (clientId, userId) => {
    Swal.fire({
      title: "Arizani ochirmoqchimisz?",
      showDenyButton: true,
      confirmButtonText: "ha",
      denyButtonText: `yo'q`,
      background: "#494a5e",
      color: "white",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteInfo({ clientId, userId }))
          .unwrap()
          .then(() => {
            successNotification("bottomRight", "Muvofaqqiyatli ochirildi");
            return dispatch(getInfos(currentPage));
          })
          .catch((err) => {
            errorNotification("bottomRight", err);
          });
      }
    });
  };

  function handleStatus(clientId) {
    if (singleUser || (multipleUser && role === "super_admin")) {
      setStatusFiltered((prev) => !prev);
      setStatusChange(!statusChange);
      let singleObj = { id: clientId, status: !status };
      dispatch(editStatus(singleObj))
        .unwrap()
        .then(() => {
          successNotification("bottomRight", "Muvofaqqiyatli o'zgardi");
          dispatch(getInfos(currentPage));
          dispatch(getSingleInfo(row.id));
        })
        .catch((err) => {
          errorNotification("bottomRight", err);
        });
    }
  }
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className="third-color"
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            <span className="countForTable">{index + 1}</span>
            {row.length}
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {firstName + " " + lastName}
        </TableCell>
        <TableCell align="center">
          {phoneClient
            .createPhoneHandler(metadata)
            .formatPhoneNumber(
              { countryCode: "998", nationalNumber: String(phoneNumber) },
              { style: "international" }
            )}
        </TableCell>
        <TableCell align="center">
          {dateFormat(new Date(created_date), "MMMM do. yyyy")}
        </TableCell>
        <TableCell align="center" onClick={() => handleStatus(id)}>
          <img
            src={statusFiltered ? done_status : progress_status}
            alt="status"
            style={{ cursor: "pointer" }}
          />
        </TableCell>
        {role === "super_admin" ? (
          <TableCell align="center">
            <IconButton aria-label="edit">
              <Link to={`/tizimli/malumot_o'zgartirish/${id}`}>
                <Edit className="text-muted" />
              </Link>
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(id, systemUserInfoProfileDto.id)}
            >
              <Delete className="text-danger" />
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Ma'sul shaxs
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Muammosi</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Manzili</TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Uy raqami
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Kvartira raqami
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Vaqti</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <img
                        src={eyeIcon}
                        className="img-fluid"
                        style={{ width: "27px" }}
                        alt="eye"
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {responsibleProfession?.nameProfession}
                    </TableCell>
                    <TableCell>{problem}</TableCell>
                    <TableCell>{address?.addressName}</TableCell>
                    <TableCell align="left">{houseNum}</TableCell>
                    <TableCell align="left">{flatNum}</TableCell>
                    <TableCell align="left">{created_time}</TableCell>
                    <TableCell align="left">
                      {systemUserInfoProfileDto?.firstName}{" "}
                      {systemUserInfoProfileDto?.lastName}
                    </TableCell>

                    {/* <div className="tableTime"></div> */}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ multipleUser, singleUser, clear }) {
  const infos = useSelector((state) => state.infos.infos.data);

  const [currentPage, setCurrentPage] = React.useState(20);
  const [filteredData, setFilteredData] = React.useState([]);
  const [windowWidth] = useWindowSize();

  function useWindowSize() {
    const size = React.useState([window.innerWidth]);
    return size;
  }

  const getFilteredData = useSelector((state) => state.infos.filterInfo.data);

  const dispatch = useDispatch();
  const cookie = new Cookie();

  React.useEffect(() => {
    let mounting = true;
    if (mounting) {
      dispatch(getInfos(currentPage || 20));
    }
    return () => {
      mounting = false;
    };
  }, [currentPage]);

  React.useEffect(() => {
    if (singleUser) {
      let currentData = (getFilteredData ? getFilteredData : infos).filter(
        (item) => {
          return item.systemUserInfoProfileDto.id === +cookie.get("id");
        }
      );
      setFilteredData(currentData);
    } else {
      setFilteredData(infos);
    }
  }, [infos, getFilteredData]);

  return (
    <>
      <TableContainer component={Paper}>
        <div className="tableWrapper_head">
          <div className="tableHead">
            <TableHead sx={{ width: "100% !important", display: "flex" }}>
              <TableRow sx={{ width: "100% !important", display: "flex" }}>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center", width: "20%" }}
                >
                  N#
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    marginLeft: "25px",
                  }}
                >
                  Ismi sharifi
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    marginLeft: windowWidth[0] < 600 ? "100px" : "25px",
                  }}
                >
                  Telefon raqami
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    marginLeft: windowWidth[0] < 600 ? "100px" : "",
                  }}
                >
                  Sana
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", marginLeft: "70px" }}
                >
                  Status
                </TableCell>
                {cookie.get("role") === "super_admin" ? (
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    o'zgartirish/o'chirish
                  </TableCell>
                ) : null}
              </TableRow>
            </TableHead>
          </div>
        </div>
        <Table aria-label="collapsible table" className="secondary-color">
          <TableBody>
            <InfiniteScroll
              dataLength={filteredData?.length || 0}
              style={{ overflow: "visible" }}
              next={() => {
                setCurrentPage((pre) => (pre += 19));
              }}
              hasMore={true}
            >
              {(clear || singleUser
                ? filteredData
                : getFilteredData
                ? getFilteredData
                : filteredData
              ).map((row, i) => (
                <div id="table">
                  <motion.div
                    key={row.id || i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.05,
                      delay: 0.05 * i,
                      ease: [0.1, 0.01, -0.01, 0.1],
                    }}
                    className="motionDiv"
                  >
                    <Row
                      key={row.id}
                      row={row}
                      singleUser={singleUser}
                      multipleUser={multipleUser}
                      currentPage={currentPage}
                      index={i}
                      getFilteredData={getFilteredData}
                      filteredData={filteredData}
                    />
                  </motion.div>
                </div>
              ))}
            </InfiniteScroll>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
