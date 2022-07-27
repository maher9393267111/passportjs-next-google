import { getCookie, removeCookies } from "cookies-next";
import Head from "next/head";
import React from "react";
import connect from "../lib/database";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import axios from "axios";
function Dashboard({ name, email }) {
  const router = useRouter();
const [text,setText] = useState("");


  const logout = () => {
    removeCookies("token");
    router.replace("/");
  };


useEffect(() => {

  const res  = axios.get("/api/hello").then(res => {
    console.log(res.data);
    setText(res.data.message);
  })
  // console.log("res is 🛢🛢🛢 ---->", res?.data?.message);
  // setText(res?.data?.message);


}, []);


  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>Welcome {name}!</div>
      <h1>aa {text}</h1>
      <div>{email}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {

  // const res =  axios.get("/api/hello");
  // console.log("res is 🛢🛢🛢 ---->", res?.message);

    // connect db
    await connect();
    // check cookie
    const token = getCookie("token", { req, res });
    if (!token)
      return {
        redirect: {
          destination: "/",
        },
      };

    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    const obj = await User.findOne({ _id: verified.id });
  //  console.log("obj user in Dashboard is 🔵🔵🔵---->", obj);
    if (!obj)
      return {
        redirect: {
          destination: "/",
        },
      };
    return {
      props: {
        email: obj.email,
        name: obj.name,
      },
    };
  } catch (err) {
    removeCookies("token", { req, res });
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}

export default Dashboard;
