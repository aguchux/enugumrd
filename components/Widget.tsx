import React from "react";

const Widget = () => {
  return (
    <>
      <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
        <div className="row mt-3">
          <div className="col-12 mb-3">
            <div className="card hover:border-[#ccd2db] border-slate-100 border-2">
              <div className="card-header bg-gradient-to-b h5 from-[#1e293b] text-white to-black">
                <h2>Appointments</h2>
              </div>
              <div className="card-body">
                <h2></h2>
              </div>

              <div className="card-footer text-right">
                <h2>0 Records</h2>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card hover:border-[#ccd2db] border-slate-100 border-2">
              <div className="card-header bg-gradient-to-b h5 from-[#1e293b] text-white to-black">
                <h2>Notifications</h2>
              </div>
              <div className="card-body">
                <h2>Ministries</h2>
              </div>

              <div className="card-footer text-right">
                <h2>0 Records</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Widget;
