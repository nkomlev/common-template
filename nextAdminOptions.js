import { CustomerModel } from "@/lib/nextAdminOptions/CustomerModel";
import { GroupModel } from "@/lib/nextAdminOptions/GroupModel";
import { Pages } from "@/lib/nextAdminOptions/Pages";

const options = {
  title: "Template service admin",

  model: {
    Customer: CustomerModel,
    Group: GroupModel,
    PushSubscription: {},
    Passkey: {}
  },
  pages: Pages
}

export default options;
