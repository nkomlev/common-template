import { CustomerModel } from "@/lib/nextAdminOptions/CustomerModel";
import { NotificationGroupModel } from "@/lib/nextAdminOptions/NotificationGroupModel";
import { Pages } from "@/lib/nextAdminOptions/Pages";

const options = {
  title: "Template service admin",

  model: {
    Customer: CustomerModel,
    NotificationGroup: NotificationGroupModel,
    PushSubscription: {},
    Passkey: {}
  },
  pages: Pages
}

export default options;