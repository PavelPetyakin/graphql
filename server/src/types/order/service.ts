import { IOrder } from "./resolver";
import { client } from "../../index";

export async function getOrders(): Promise<IOrder[]> {
  try {
    let qText: string = "SELECT * FROM orders ORDER BY created DESC";
    return (await client.query(qText)).rows;
  } catch (err) {
    throw new Error("Failed to select orders");
  }
}

export async function getOrder(parent: {id: string}): Promise<IOrder> {
  try {
    const qText: string = "SELECT * FROM orders WHERE id = $1";
    const qValue: string[] = [parent.id];
    return (await client.query(qText, qValue)).rows[0];
  } catch (err) {
    throw new Error("Failed to find order");
  }
}
