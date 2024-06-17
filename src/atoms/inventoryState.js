import { atom } from "recoil";

const initState = {
    money: 0,
    couponList: [],
    itemList: [],
};

const inventoryState = atom({
    key: "inventoryState",
    default: initState,
});

export default inventoryState;
