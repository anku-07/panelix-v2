import axiosInstance from "../utils/axiosInstance";

const getAllUser = async () => {
  try {
    const res = await axiosInstance.get("users");
    return res.data;
  } catch (error) {
    console.log("Error fetching users", error);
  }
};

export default { getAllUser };
