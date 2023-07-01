"use client";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
async function getData(
  limit: number,
  skip: number,
  searchCase?: string | null | undefined
) {
  let res;
  if (searchCase) {
    res = await fetch(
      `https://dummyjson.com/users/search?q=${searchCase}&limit=${limit}&skip=${skip}`
    );
  } else {
    res = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    );
  }
  if (!res.ok) {
    return [];
  }
  return res.json();
}
async function deleteData(id: number) {
  let res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return [];
  }
  return res.json();
}
async function addData(data: any) {
  let res = await fetch(`https://dummyjson.com/users/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
    }),
  });

  if (!res.ok) {
    return [];
  }
  return res.json();
}
async function updateData(data: any) {
  let res = await fetch(`https://dummyjson.com/users/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
    }),
  });

  if (!res.ok) {
    return [];
  }
  return res.json();
}
const TABLE_HEAD = [
  "#",
  "Name",
  "Email",
  "Phone",
  "Website",
  "Company Name",
  "",
];
var currentData: any;
export default function Students() {
  const [Data, setData] = useState<Array<any>>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [total, setTotal] = useState<number>();
  const [searchCase, setSearchCase] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [company, setCompany] = useState();
  const [website, setWebsite] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    getUsers(rowsPerPage, newPage, searchCase);
    let theQuery;
    if (searchCase === undefined) {
      theQuery = `pq=${newPage + 1}&ppsq=${rowsPerPage}`;
    } else {
      theQuery = `pq=${newPage + 1}&sq=${searchCase}&ppsq=${rowsPerPage}`;
    }
    router.push(pathname + "?" + theQuery);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getUsers(parseInt(event.target.value), 0, searchCase);
    let theQuery;
    if (searchCase === undefined) {
      theQuery = `pq=${1}&ppsq=${parseInt(event.target.value)}`;
    } else {
      theQuery = `pq=${1}&sq=${searchCase}&ppsq=${parseInt(
        event.target.value
      )}`;
    }
    router.push(pathname + "?" + theQuery);
  };

  const searchParams = useSearchParams();
  const queryPage = searchParams.get("pq");
  const querySearch = searchParams.get("sq");
  const queryPerpageSize = searchParams.get("ppsq");
  const pathname = usePathname();
  const getUsers = async (
    rPerPage: number = rowsPerPage,
    p: number = page,
    sCase: string | null | undefined
  ) => {
    var pS = rPerPage;
    var start_index = p * Number(pS) + 1;
    var theData = await getData(rowsPerPage, start_index - 1, sCase);
    setTotal(theData.total);
    setData(theData.users);
  };
  useEffect(() => {
    let thePerPage;
    let thePageNumber;
    let theSearch;
    if (queryPage) {
      if (!isNaN(Number(queryPage))) {
        let theNumber = Number(queryPage);
        if (theNumber > 0) {
          setPage(Number(queryPage) - 1);
          thePageNumber = theNumber - 1;
        }
      }
    }
    if (querySearch) {
      setSearchCase(querySearch);
      theSearch = querySearch;
    }
    if (queryPerpageSize) {
      if (!isNaN(Number(queryPerpageSize))) {
        let theNumber = Number(queryPerpageSize);
        if (theNumber > 0) {
          setRowsPerPage(Number(queryPerpageSize));
          thePerPage = theNumber;
        }
      }
    }
    getUsers(thePerPage, thePageNumber, theSearch);
  }, [queryPage, queryPerpageSize, querySearch]);
  const onEdit = async (data: any) => {
    var theIndex = Data.indexOf(
      Data.filter((item) => item.id === currentData.id)[0]
    );
    var theTempData = Data;
    theTempData[theIndex] = {
      ...currentData,
      firstName: firstName,
      lastName: lastName,
      website: website,
      company: {
        ...currentData.compmany,
        name: company,
      },
      email: email,
      phone: phoneNumber,
    };
    let theResult = await updateData(theTempData[theIndex]);
    setData(theTempData);
    setIsOpen(false);
  };
  const onDelete = async (
    data: any,
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    var theTempData = Data.filter((item) => item.id !== data.id);
    let theResult = await deleteData(data.id);
    setData(theTempData);
    setIsOpen(false);
  };
  const onAdd = async (data: any) => {
    var theTempData = Data;
    let obj = {
      ...currentData,
      firstName: firstName,
      lastName: lastName,
      website: website,
      company: {
        name: company,
      },
      email: email,
      phone: phoneNumber,
    };
    let theResult = await addData(obj);
    theTempData.unshift(theResult);
    setData(theTempData);
    setIsOpen(false);
  };
  const saveHandler = () => {
    if (isEdit) {
      onEdit(currentData);
    } else {
      onAdd(currentData);
    }
  };
  return (
    <div id="home-page" className="bg-c-white">
      <div className="flex items-center justify-between w-full">
        <div>
          <p>Student List</p>
        </div>
        <div className="items-end flex p-2">
          <TextField
            id="search-basic"
            label="Search"
            variant="outlined"
            value={searchCase}
            size="small"
            sx={{
              marginRight: 5,
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              let theValue = event.target.value;
              setSearchCase(event.target.value);
              let theQuery;
              if (theValue === "") {
                theQuery = `pq=${page}&ppsq=${rowsPerPage}`;
                getUsers(rowsPerPage, page, undefined);
              } else {
                theQuery = `pq=${page}&sq=${theValue}&ppsq=${rowsPerPage}`;
                getUsers(rowsPerPage, page, theValue);
              }
              router.push(pathname + "?" + theQuery);
            }}
          />
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              setFirstName(undefined);
              setLastName(undefined);
              setEmail(undefined);
              setCompany(undefined);
              setWebsite(undefined);
              setPhoneNumber(undefined);
              setIsEdit(false);
              setIsOpen(true);
            }}
          >
            ADD NEW USER
          </Button>
        </div>
      </div>
      <table className="w-full text-left ">
        <thead className="flex text-black w-full">
          <tr className="flex w-full mb-4">
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="w-1/4"
              >
                <Typography
                  variant="caption"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full h-h-screen text-black">
            {Data?.map((item: any, index: any) => {
              const isLast = index === Data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={item.name} className="flex w-full mb-4">
                  <td className='p-4 w-1/4'>
                    <Avatar alt="Remy Sharp" src={item.image} />
                  </td>
                  <td className='p-4 w-1/4'>
                    <Typography
                      variant="caption"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.firstName + " " + item.lastName}
                    </Typography>
                  </td>
                  <td className='p-4 w-1/4'>
                    <Typography
                      variant="caption"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.email}
                    </Typography>
                  </td>
                  <td className='p-4 w-1/4'>
                    <Typography
                      variant="caption"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.phone}
                    </Typography>
                  </td>
                  <td className='p-4 w-1/4'>
                    <Typography
                      variant="caption"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.website}
                    </Typography>
                  </td>
                  <td className='p-4 w-1/4'>
                    <Typography
                      variant="caption"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.company?.name}
                    </Typography>
                  </td>
                  <td className="p-4 w-1/4">
                    <Button
                      onClick={() => {
                        setIsEdit(true);
                        currentData = item;
                        setFirstName(item.firstName);
                        setLastName(item.lastName);
                        setEmail(item.email);
                        setCompany(item.company?.name);
                        setWebsite(item.website);
                        setPhoneNumber(item.phone);
                        setIsOpen(true);
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button color="error" onClick={onDelete.bind({}, item)}>
                      <Delete />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <TablePagination
        component="div"
        count={total ? total : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={isOpen}>
        <DialogTitle>Add/Edit Panel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out those field to procced
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={(event: any) => {
              setFirstName(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastname"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={(event: any) => {
              setLastName(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(event: any) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            value={phoneNumber}
            onChange={(event: any) => {
              setPhoneNumber(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="website"
            label="Website"
            type="text"
            fullWidth
            variant="standard"
            value={website}
            onChange={(event: any) => {
              setWebsite(event.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="c-name"
            label="Company Name"
            type="text"
            fullWidth
            variant="standard"
            value={company}
            onChange={(event: any) => {
              setCompany(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={saveHandler}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
