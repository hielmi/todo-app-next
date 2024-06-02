import bcrypt from "bcrypt";
import { addData, retriveDataByField } from "@/lib/firebase/services";

export async function signUp(
  userData: {
    email: string;
    name: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    image?: string;
  },
  callback: Function
) {
  const data = await retriveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    callback({ status: false, message: "Email is already registered" });
  } else {
    if (!userData.image) {
      userData.image = "";
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    try {
      await addData("users", userData, (result: boolean) => {
        callback({ status: result, message: "Register success" });
      });
    } catch (error) {
      callback({ status: false, message: "Register Failed" });
    }
  }
}

export async function signIn(email: string) {
  const data = await retriveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: {
    id?: string;
    email: string;
    fullname?: string;
    phone?: string;
    created_at?: Date;
    updated_at?: Date;
    password?: string;
    image: string;
  },
  callback: Function
) {
  const user = await retriveDataByField("users", "email", data.email);
  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";
    await addData("users", data, (status: boolean, res: any) => {
      data.id = res.path.replace("users/", "");
      if (status) {
        callback(data);
      }
    });
  }
}
