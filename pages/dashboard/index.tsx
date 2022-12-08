import SecureLayout from "../../layouts/SecureLayout";
import { withAuthSync } from "../../utils/withAuthSync";

import communities from "../../data/communities.json";
import { useState } from "react";

import { RootState, Dispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";

type ComType = {
  id: number;
  name: string;
  pg: string;
  tel: string;
};

const Home = () => {
  const dispatch = useDispatch<Dispatch>();

  const { selectedCommunity } = useSelector(
    (state: RootState) => state.communities
  );

  const [people, setPeople] = useState<ComType[]>(communities);
  const [query, setQuery] = useState<string>("");

  const selectCommunity = (communityId: number) => {
    dispatch.communities.setBusyAsync(true);
    dispatch.communities.selectCommunity(communityId);
    dispatch.communities.setBusyAsync(false);
  };

  const searchCommunity = async (e: any, q: string) => {
    dispatch.communities.setBusyAsync(true);
    setQuery(q);
    const newp: any = communities.filter((peo, i) => {
      return (
        peo.name.toLowerCase().includes(q.toLowerCase()) ||
        peo.pg.toLowerCase().includes(q.toLowerCase()) ||
        peo.tel.toLowerCase().includes(q.toLowerCase())
      );
    });
    setPeople(newp);
    dispatch.communities.setBusyAsync(false);
  };

  return (
    <SecureLayout>
      <div className="container mt-3 h-screen">
        <div className="row">
          <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3">
            <div className="card hover:border-[#ccd2db] border-slate-100 border-2">
              <div className="card-header bg-gradient-to-b h5 from-[#1e293b] text-white to-black">
                <h2>Communities</h2>
              </div>
              <div className="card-body mb-0 pb-0">
                <div className="mt-0 clear-both">
                  <div className="input-group input-group-md ">
                    <input
                      type="text"
                      className="form-control form-control-lg clear-both w-full rounded-b-none"
                      placeholder="Search Communities..."
                      value={query}
                      onChange={(e: any) => searchCommunity(e, e.target.value)}
                    />
                  </div>
                  <em className="float-left text-sm text-gray-600">
                    {query.length ? `search for ${query}` : "search"}
                  </em>
                  <em className="float-right">{people.length} Records</em>
                </div>
              </div>
              {selectedCommunity ? (
                <div className="container my-1">
                  <div className="w-full min-h-[50px] border p-2 rounded border-bg-blue-400 bg-slate-100">
                    <strong>Okpogho</strong> of <strong>50,000</strong> people
                    is in <strong>Ezeagu North</strong> L.G.A of Enugu State.
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="card-body mt-0">
                <div className="max-h-[250px] overflow-y-scroll">
                  <table className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                      <tr>
                        <th>
                          Communities.
                          <hr />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {people.map((community, index) => (
                        <>
                          <tr
                            key={index}
                            className="cursor-pointer"
                            onClick={() => selectCommunity(community.id)}
                          >
                            <td scope="row">
                              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <div className="px-6 py-4">
                                  <div className="font-bold text-xl mb-2">
                                    {community.name}
                                  </div>
                                  <p className="text-gray-700 text-base">
                                    Lorem ipsum dolor sit amet, consecteturhil.
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card-footer text-right">
                <h2>{communities.length} Communities</h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3">
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
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-5">
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
    </SecureLayout>
  );
};
export default withAuthSync(Home);
