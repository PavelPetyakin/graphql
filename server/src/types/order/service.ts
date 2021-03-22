import { IOrder } from "./types";
import { client } from "../../index";

export async function getOrders(): Promise<IOrder[]> {
  try {
    let qText: string = "SELECT * FROM orders ORDER BY created DESC";
    return (await client.query(qText)).rows;
  } catch (err) {
    throw new Error("Failed to select orders");
  }
}

export async function getOrderById(id: string): Promise<IOrder> {
  try {
    const qText: string = "SELECT * FROM orders o WHERE o.id = $1";
    const qValue: string[] = [id];
    return (await client.query(qText, qValue)).rows[0];
  } catch (err) {
    throw new Error("Failed to find order");
  }
}

export async function getOrdersByUser(id: string): Promise<IOrder[]> {
  try {
    const qText: string = "SELECT * FROM orders o WHERE o.person_id = $1";
    const qValue: string[] = [id];
    return (await client.query(qText, qValue)).rows;
  } catch (err) {
    throw new Error("Failed to find order");
  }
}
