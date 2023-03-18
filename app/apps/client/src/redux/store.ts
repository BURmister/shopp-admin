import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import clothesReducer from './slices/clothes/clothes.slice';
import oneClothesReducer from './slices/clothes/oneClothes.slice';
import deleteClothesReducer from './slices/clothes/deleteClothes.slice';
import addClothesReducer from './slices/clothes/addClothes.slice';
import amountClothesReducer from './slices/clothes/amountClothes.slice';
import editClothesReducer from './slices/clothes/editClothes.slice'

import inventoryReducer from './slices/inventory/inventory.slice';
import oneInventoryReducer from './slices/inventory/oneInventory.slice';
import deleteInventoryReducer from './slices/inventory/deleteInventory.slice';
import addInventoryReducer from './slices/inventory/addInventory.slice';
import amountInventoryReducer from './slices/inventory/amountInventory.slice';
import editInventoryReducer from './slices/inventory/editInventory.slice';

import authReducer from './slices/auth/auth.slice';

import deliversReducer from './slices/delivers/delivers.slice';
import oneDeliveryReducer from './slices/delivers/oneDelivery.slice';
import deleteDeliveryReducer from './slices/delivers/deleteDelivery.slice';
import completeDeliveryReducer from './slices/delivers/completeDelivery.slice';
import addDeliveryReducer from './slices/delivers/addDelivery.slice'
import editDeliveryReducer from './slices/delivers/editDeliver.slice';

import usersReducer from './slices/users/users.slice';
import oneUserReducer from './slices/users/oneUser.slice';
import deleteUserReducer from './slices/users/deleteUser.slice';
import addUserReducer from './slices/users/addUser.slice';
import editUserReducer from './slices/users/editUser.slice';


export const store = configureStore({
   reducer: {
      clothes: clothesReducer,
      oneClothes: oneClothesReducer,
      deleteClothes: deleteClothesReducer,
      addClothes: addClothesReducer,
      amountClothes: amountClothesReducer,
      editClothes: editClothesReducer,

      inventory: inventoryReducer,
      oneInventory: oneInventoryReducer,
      deleteInventory: deleteInventoryReducer,
      addInventory: addInventoryReducer,
      amountInventory: amountInventoryReducer,
      editInventory: editInventoryReducer,

      delivers: deliversReducer,
      oneDelivery: oneDeliveryReducer,
      deleteDelivery: deleteDeliveryReducer,
      completeDelivery: completeDeliveryReducer,
      addDelivery: addDeliveryReducer,
      editDelivery: editDeliveryReducer,

      users: usersReducer,
      oneUser: oneUserReducer,
      deleteUser: deleteUserReducer,
      addUser: addUserReducer,
      editUser: editUserReducer,

      auth: authReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
