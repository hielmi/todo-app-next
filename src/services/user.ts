import instance from "@/lib/axios/instance";

const userServices = {
  getUser: () => instance.get("/api/user"),
};

export default userServices;
