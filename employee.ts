
export interface Employee {

  id: string;
  name: string;
  phoneno: string;
  email: string;
  address: string;
  departmentit: string;
  status: string
  createdby: string;
  createddtm: string;
  updatedby: string;
  updateddtm: string;
  country: {
    cid: string,
    cname: string
  }

}