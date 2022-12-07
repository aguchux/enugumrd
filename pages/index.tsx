import { Row, Col } from "react-bootstrap";
import MenuBar from "../components/MenuBar";
import BaseLayout from "../layouts/BaseLayout";

import communities from "../data/communities.json";
import { useState } from "react";

type ComType = {
  id: number;
  name: string;
  pg: string;
  tel: string;
};

const Home = () => {
  const [selecedCommunty, setSelecedCommunty] = useState<number>(0);
  const [people, setPeople] = useState<ComType[]>(communities);
  const [query, setQuery] = useState<string>("");

  const selectCommunity = (communityId: number) => {
    setSelecedCommunty(communityId);
  };

  const searchCommunity = async (e: any, q: string) => {
    setQuery(q);
    const newp: any = communities.filter((peo, i) => {
      return (
        peo.name.toLowerCase().includes(q.toLowerCase()) ||
        peo.pg.toLowerCase().includes(q.toLowerCase()) ||
        peo.tel.toLowerCase().includes(q.toLowerCase())
      );
    });
    setPeople(newp);
  };

  return (
    <BaseLayout>
      <MenuBar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 ">
            <div className="card hover:border-green-700 border-slate-100 border-2">
              <div className="card-header bg-gradient-to-b h5 from-[#1e293b] text-white to-black">
                <h2>Communities</h2>
              </div>
              <div className="card-body mb-0 pb-0">
                <div className="mt-0 clear-both">
                  <div className="input-group input-group-md ">
                    <input
                      type="text"
                      className="form-control clear-both w-full"
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
              {selecedCommunty ? (
                <div className="container">
                  <div className="text-white w-full min-h-[50px] border p-2 rounded border-bg-blue-400">
                    {selecedCommunty}
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="card-body mt-0">
                <div className="max-h-[200px] overflow-y-scroll">
                  <table className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                      <tr>
                        <th>Community</th>
                        <th>PG</th>
                        <th>Tel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {people.map((community, index) => (
                        <>
                          <tr
                            key={index}
                            className="cursor-pointer hover:bg-blue-200"
                            onClick={() => selectCommunity(community.id)}
                          >
                            <td scope="row">{community.name}</td>
                            <td>{community.pg}</td>
                            <td>{community.tel}</td>
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
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 ">
            <div className="card hover:border-green-700 border-slate-100 border-2">
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
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div className="card hover:border-green-700 border-slate-100 border-2">
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
    </BaseLayout>
  );
};
export default Home;
