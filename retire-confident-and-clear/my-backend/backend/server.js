const path = require("path");
const express = require("express");

const cors = require("cors");
const app = express();
// Or enable CORS for specific origi
const allowedOrigins = [
  "https://my-frontend-two-lake.vercel.app",
  "https://www.retireconfidentandclear.com",
  "https://retireconfidentandclear.com", // Frontend URL
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Allow cookies if needed
  }),
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/src")));
// const process = require("dotenv-safe");
require("dotenv").config({ path: __dirname + "/.env" });
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

const dev_api_url = "https://crm.redtailtechnology.com/api/public/v1/";
//const dev_api_url = "https://review.crm.redtailtechnology.com/api/public/v1/"; //ACTUAL DEV

const authenticate = async (e) => {
  try {
    const authentication_string = Buffer.from(
      `${process.env.API_KEY}:${process.env.CRM_USERNAME}:${process.env.CRM_PASSWORD}`,
    ).toString("base64");

    const response = await fetch(`${dev_api_url}/authentication`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authentication_string}`,
        Accept: "application/json",
        Connection: "keep-alive",
        "Content-Type": "text/xml",
      },
    });
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      const errorText = await response.text();
      console.error("Error Response Body:", response);
      return;
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Submission Error:", error);
  }
};

app.post("/api/user/create", async (req, res) => {
  /*  console.log(req.body); */
  console.log("Received Data:", req.body);
  const formData = req.body;
  formData.type = "Crm::Contact::Individual";
  important_information_content = formData.important_information;
  // console.log(formData);
  for (let i = 0; i < formData.phones.length; i++) {
    try {
      let phoneNumber = formData.phones[i].number;

      // Replace unwanted characters
      phoneNumber = phoneNumber
        .replace(/-/g, "")
        .replace(/\//g, "")
        .replace(/\./g, "");

      // Update the phone object with the cleaned phone number
      formData.phones[i].number = phoneNumber;
    } catch {
      continue;
    }
  }
  let authentication_key;
  const post_contact = async (e) => {
    let authData;
    try {
      authData = await authenticate();

      if (!authData) {
        console.error("authentication data failed to populate");
      }
    } catch (error) {
      console.error("Error during authentication", error);
    }
    const user_key = authData.authenticated_user.user_key;
    authentication_key = Buffer.from(
      `${process.env.API_KEY}:${user_key}`,
    ).toString("base64");
    try {
      const response = await fetch(`${dev_api_url}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `UserkeyAuth ${authentication_key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const error_body = await response.text();
        console.error(`HTTP error! Status: ${response.status}`);
        console.log("Error Response Body:", error_body);
        return { sucess: false, message: error_body };
      }
      const body = await response.json();
      // console.log(body);
      return { sucess: true, data: body };
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };
  const result = await post_contact();
  console.log(result.sucess);
  put_important_information(
    result.data.contact.id,
    formData.important_information,
    authentication_key,
  );

  if (result.sucess) {
    res.status(200).send({ sucess: true });
  } else {
    res.status(500).send({ error: result.message });
  }
});

const put_important_information = async (
  contact_id,
  important_information_content,
  authentication_key,
) => {
  console.log(contact_id, important_information_content, authentication_key);
  const payload = { content: important_information_content };
  try {
    const response = await fetch(
      `${dev_api_url}/contacts/${contact_id}/important_information`,
      {
        method: "PUT",
        headers: {
          Authorization: `UserkeyAuth ${authentication_key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    if (!response.ok) {
      const error_body = await response.text();
      console.error(`HTTP error! Status: ${response.status}`);
      console.log("Error Response Body:", "failed here 1");
      return { sucess: false, message: response };
    }
    const body = await response.json();
    console.log(body);
    return { sucess: true, data: "error here 1 " };
  } catch (error) {
    console.error("Submission Error:", "error here 2 ");
  }
};

// const PORT = process.env.PORT || 8003;
//
// app.listen(
//   PORT,
//   console.log(`Server started on port ${PORT}`),
//   console.log(`http://localhost:${PORT}`),
// );
app.options("*", cors());
module.exports = app;
