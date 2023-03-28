export * from './contacts.service';
import { ContactsService } from './contacts.service';
export * from './customers.service';
import { CustomersService } from './customers.service';
export const APIS = [ContactsService, CustomersService];
