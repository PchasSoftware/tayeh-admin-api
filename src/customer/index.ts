import { Base } from "../base";
import {
  customer,
} from "./types";

const resourceName = "customer";

export class Customer extends Base {

  getCartPaymentUrl() {
    return this.get<customer>(`${resourceName}/customer/cart/pay`);
  }
}
