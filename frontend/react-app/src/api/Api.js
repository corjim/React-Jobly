import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token = localStorage.getItem("token");

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // Individual API routes

  /** Get details on all companies */

  static async getCompanies() {
    try {
      let res = await this.request("companies");
      return res.companies;
    } catch (error) {
      console.error("Error getting companies:", error);
      throw error;
    }
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all jobs */

  static async getJobs() {
    try {
      let res = await this.request("jobs");
      return res.jobs;
    } catch (error) {
      console.error("Error getting jobs:", error);
      throw error;
    }
  };

  // static async login(username, password) {
  //   let res = await this.request("auth/login", { username, password }, "post");
  //   console.log("Login API response:", res); //Check token
  //   this.token = res.token;
  //   localStorage.setItem("token", res.token);
  //   return res.token;
  // }

  static async login(username, password) {
    try {
      let res = await this.request("auth/login", { username, password }, "post");
      console.log("Login API response:", res);
      return res.token;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  }

  /** Authenticate user */

  static async authenticateUser(username, password) {
    try {
      let res = await this.request("auth/token", { username, password }, "post");
      const { token } = res; // Extract the token from the response
      return { token }; // Only return the token
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  };

  static async signup(userData) {
    let res = await this.request("auth/register", userData, "post");
    this.token = res.token;

    console.log("THIS IS THE TOKEN", this.token);

    localStorage.setItem("token", res.token);
    return res.token;
  }

  static async getUser(username) {
    return await this.request(`users/${username}`);
  }

  static async updateUser(username, userData) {
    return await this.request(`users/${username}`, userData, "patch");
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;