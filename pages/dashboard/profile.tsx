import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecureLayout from "../../layouts/SecureLayout";
import { Dispatch, RootState } from "../../store";
import { withAuthSync } from "../../utils/withAuthSync";
import { Profile } from "../../interfaces";
import { toast } from "react-toastify";
type PassType = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};
const Profile = ({ token }: any) => {
  const dispatch = useDispatch<Dispatch>();
  const [password, setPassword] = useState<PassType>({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const { profile, busy } = useSelector((state: RootState) => state.config);
  const [updater, setUpdater] = useState<Profile>(profile);

  const updateProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.config.setBusy(true);
    const result = await fetch(`/api/accounts/${token}/updateProfile`, {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updater),
    });
    const _profile = await result.json();
    if (_profile.status) {
      dispatch.config.setProfile(_profile.profile);
      toast.success("Profile has been changed.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Ooops! Profile change failed!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch.config.setBusy(false);
  };
  const updatePassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch.config.setBusy(true);
    // Do your PAssword Match Check //
    const isMatch: boolean = password.password === password.confirmPassword;
    if (!isMatch) {
      dispatch.config.setBusy(true);
      return;
    }
    // Do your PAssword Match Check //
    const result = await fetch(`/api/accounts/${token}/updatePassword`, {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    });
    const { status, modifiedCount } = await result.json();
    if (status) {
      toast.success("Password has been changed.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error("Ooops! Password change failed!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch.config.setBusy(false);
  };

  return (
    <SecureLayout>
      <section>
        <div className="row mb-3">
          <div className="col-12">
            <div className="card border-2">
              <div className="card-header bg-gradient-to-b h5 from-[#1e293b] text-white to-black">
                <h2 className="h5">
                  Profile : {profile.lastname} {profile.firstname}
                </h2>
              </div>

              <div className="card-body mb-0 py-10">
                <form onSubmit={updateProfile}>
                  <h1 className="my-3 h4">
                    Basic Information
                    <hr className="my-1" />
                  </h1>
                  <div className="clear-both row">
                    <div className="col-6">
                      <div className="form-group">
                        <label className="h6">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          value={updater.firstname}
                          onChange={(e) =>
                            setUpdater({
                              ...updater,
                              firstname: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="h6">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          value={updater.lastname}
                          onChange={(e) =>
                            setUpdater({ ...updater, lastname: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 clear-both row">
                    <div className="col-6">
                      <div className="form-group">
                        <label className="h6">Email Address</label>
                        <input
                          type="email"
                          readOnly={true}
                          disabled={true}
                          className="form-control"
                          placeholder="Email Address"
                          value={updater.email}
                          onChange={(e) =>
                            setUpdater({ ...updater, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="h6">Telephone</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Telephone"
                          value={updater.mobile}
                          onChange={(e) =>
                            setUpdater({ ...updater, mobile: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-6 my-3">
                      <button
                        type="submit"
                        className="btn w-full bg-[#647a9d] hover:bg-[#25344d] text-white text-xl"
                      >
                        Update Profile
                      </button>
                    </div>
                    <div className="col-6"></div>
                  </div>
                </form>

                <form onSubmit={updatePassword}>
                  <h1 className="my-3 h4">
                    Change Password
                    <hr className="my-1" />
                  </h1>
                  <div className="mt-2 clear-both row">
                    <div className="col-4">
                      <div className="form-group">
                        <label className="h6">Current Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Current Password"
                          value={password.currentPassword}
                          onChange={(e) =>
                            setPassword({
                              ...password,
                              currentPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="form-group">
                        <label className="h6">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="New Password"
                          value={password.password}
                          onChange={(e) =>
                            setPassword({
                              ...password,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="form-group">
                        <label className="h6">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={password.confirmPassword}
                          onChange={(e) =>
                            setPassword({
                              ...password,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6 my-3">
                      <button
                        type="submit"
                        className="btn w-full bg-[#647a9d] hover:bg-[#25344d] text-white text-xl"
                      >
                        Change Password
                      </button>
                    </div>
                    <div className="col-6"></div>
                  </div>
                </form>
              </div>

              <div className="card-footer text-right"></div>
            </div>
          </div>
        </div>
      </section>
    </SecureLayout>
  );
};

export default withAuthSync(Profile);
