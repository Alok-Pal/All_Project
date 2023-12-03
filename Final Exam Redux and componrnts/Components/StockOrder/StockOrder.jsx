import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import StockOrderAction from "../../redux/Action/StockOrderAction/StockOrderAction";
import StockGetAction from "../../redux/Action/StockOrderAction/StockGetAction";
import CreateOrderAction from "../../redux/Action/OrderAction/CreateOrderAction";
import GetOrderAction from "../../redux/Action/OrderAction/GetOrderAction";
import axios from "axios";

const StockOrder = () => {
  const [stockState, setStockState] = useState([]);
  const [orderState, setOrderState] = useState([]);

  // use selector

  const state = useSelector((state) => state);

  console.log("state", state);

  // handle stock state change
  const handleStockState = (e) => {
    console.log(e.target.value);
    setStockState({ ...stockState, [e.target.name]: e.target.value });
  };

  console.log("stockState", stockState);
  // dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const dataStock = state?.GetStockReducer?.data?.data;

    const { stockName, stockQuantity } = stockState;
    // Check if any field is empty
    if (!stockName || !stockQuantity) {
      alert("Please fill in all the fields");
      return;
    }
    console.log(
      "🚀 ~ file: StockOrder.jsx:38 ~ handleSubmit ~ dataStock:",
      dataStock
    );

    // Check if stockName already exists
    const isStockNameDuplicate = dataStock?.some(
      (stock) => stock.stockName === stockName
    );

    if (isStockNameDuplicate) {
      alert("Stock name already exists. Please choose a different name.");
      return;
    }

    dispatch(StockOrderAction(stockState));

    setStockState({});
  };

  // let stockdependency;
  useEffect(() => {
    dispatch(StockGetAction());
    dispatch(GetOrderAction());
  }, [JSON.stringify(state?.GetOrder?.data?.data)]);

  // handle Order change
  const handleOrderState = (e) => {
    console.log(e.target.value);
    setOrderState({ ...orderState, [e.target.name]: e.target.value });
  };
  console.log(
    "🚀 ~ file: StockOrder.jsx:10 ~ StockOrder ~ orderState:",
    orderState
  );

  //  handle submit and checking the conditions

  const handleOrderSubmit = () => {
    const { CustomerName, orderQuantity, StockName } = orderState;
    // Check if any field is empty
    if (!CustomerName || !orderQuantity || !StockName) {
      alert("Please fill in all the fields");
      return;
    }

    const data = state?.GetStockReducer?.data?.data;
    const filterData = (stockName) => {
      return data.filter(
        (item) => item.id === stockName || item.stockName === stockName
      );
    };

    const filteredResult = filterData(StockName);
    if (orderQuantity > filteredResult[0]?.stockQuantity) {
      alert(
        "Order quantity exceeds stock quantity! Please add a lesser order quantity."
      );
    } else {
      dispatch(CreateOrderAction(orderState));
    }
  };

  // handleDelete
  const handleDelete = async (e) => {
    console.log(e.target.value);
    const deleteid = e.target.value;
    const response = await axios.delete(
      `http://localhost:8000/api/deleteOrder/${deleteid}`
    );
    console.log(
      "🚀 ~ file: StockOrder.jsx:106 ~ handleDelete ~ response:",
      response
    );
  };

  return (
    <>
      {/* <div className="d-flex"> */}
      <div className="container mt-5">
        <Grid container>
          <Grid className="border p-4" item xs={2}>
            <b>Stock</b>
          </Grid>
          <Grid className="border p-4 " item xs={10}>
            <div>
              <div>
                <b>stock</b>
              </div>
            </div>
            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "-30px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Add Stock
                </button>

                {/* <!-- Modal --> */}
                <div
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                          Add Stock
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div>
                          <label>
                            <b>Name:</b>
                          </label>{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input
                            type="text"
                            name="stockName"
                            value={stockState.stockName}
                            required
                            onChange={(e) => {
                              handleStockState(e);
                            }}
                          />
                        </div>
                        <div className="mt-3">
                          <label>
                            <b>Stock Quantity:</b>
                          </label>{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input
                            type="number"
                            name="stockQuantity"
                            value={stockState.stockQuantity}
                            required
                            onChange={(e) => {
                              handleStockState(e);
                            }}
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <table className="border mt-2">
                <thead>
                  <tr>
                    <th className="border ps-4 pe-4">Stock Name</th>
                    <th className="border ps-4 pe-4">Stock Quantity</th>
                    <th className="border ps-4 pe-4">Order Quantity</th>
                    <th className="border ps-4 pe-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state?.GetStockReducer?.data?.data?.map((data) => {
                    const totalOrderQuantity = data.orders.reduce(
                      (acc, order) => acc + order.orderQuantity,
                      0
                    );
                    const remainingStockQuantity =
                      data.stockQuantity - totalOrderQuantity;

                    return (
                      <tr>
                        <td className="border ps-4 pe-4">{data?.stockName}</td>
                        <td className="border ps-4 pe-4">
                          {remainingStockQuantity}
                        </td>
                        <td className="border ps-4 pe-4">
                          {totalOrderQuantity}
                        </td>
                        <td className="border ps-4 pe-4">
                          <button className="btn btn-danger">delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid className="border p-4" item xs={2}>
            <b>Order</b>
          </Grid>
          <Grid className="border p-4 " item xs={10}>
            <div>
              <div>
                <b>Order</b>
              </div>
            </div>
            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "-30px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Order
                </button>

                {/* <!-- Modal --> */}
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Add Order
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div className="mt-3">
                          <label>
                            <b>Customer Name:</b>
                          </label>{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input
                            type="text"
                            name="CustomerName"
                            // value={}
                            required
                            onChange={(e) => {
                              handleOrderState(e);
                            }}
                          />
                        </div>

                        <div className="mt-3">
                          <label>
                            <b>Stock :</b>
                          </label>{" "}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <select
                            // class="form-select"
                            aria-label="Default select example"
                            name="StockName"
                            onChange={(e) => {
                              handleOrderState(e);
                            }}
                          >
                            <option selected> Select Stock</option>
                            {state?.GetStockReducer?.data?.data?.map((data) => (
                              <option value={data.id}>{data.stockName}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mt-3">
                          <label>
                            <b>Order Quantity:</b>
                          </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input
                            type="number"
                            name="orderQuantity"
                            required
                            onChange={(e) => {
                              handleOrderState(e);
                            }}
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={(e) => {
                            handleOrderSubmit(e);
                          }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* TABLE */}
            <div>
              <table className="border mt-2">
                <thead>
                  <tr>
                    <th className="border ps-4 pe-4">Customer</th>
                    <th className="border ps-4 pe-4">Stock Name</th>
                    <th className="border ps-4 pe-4">Order Quantity</th>
                    <th className="border ps-4 pe-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state?.GetOrder?.data?.data?.map((data) => (
                    <tr>
                      <td className="border ps-4 pe-4">{data?.customerName}</td>
                      <td className="border ps-4 pe-4">
                        {data?.Stock?.stockName}
                      </td>
                      <td className="border ps-4 pe-4">
                        {data?.orderQuantity}
                      </td>
                      <td className="border ps-4 pe-4">
                        <button
                          className="btn btn-danger"
                          value={data?.id}
                          onClick={(e) => {
                            handleDelete(e);
                          }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* </div> */}
    </>
  );
};

export default StockOrder;
