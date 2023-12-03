import React, { useState } from "react";
import Grid from "@mui/material/Grid";

const Modal = () => {
  const [stockState, setStockState] = useState([]);

  // handle stock state change
  const handleStockState = (e) => {
    console.log(e.target.value);

    setStockState({ ...stockState, [e.target.name]: e.target.value });
  };
  console.log(
    "🚀 ~ file: StockOrder.jsx:10 ~ StockOrder ~ stockState:",
    stockState
  );
  return (
    <>
      <div className="d-flex">
        <div className="container mt-5">
          <Grid container>
            <Grid className="border p-4" item xs={2}>
              <b>Stock</b>
            </Grid>
            <Grid
              className="border p-4 d-flex justify-content-between align-items-center"
              item
              xs={10}
            >
              <div>
                <div>
                  <b>stock</b>
                </div>
              </div>

              <div>
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Launch static backdrop modal
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
                          Modal title
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">...</div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Understood
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid className="border p-4" item xs={2}>
              <b>Stock</b>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Modal;
