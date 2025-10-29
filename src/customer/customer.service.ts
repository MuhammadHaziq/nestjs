import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './interface/customer.interface';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  create(createCustomerDto: CreateCustomerDto): Customer {
    const newCustomer: Customer = {
      id: this.customers.length + 1,
      ...createCustomerDto,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  findAll(): Customer[] {
    return this.customers;
  }

  findOne(id: number): Customer | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Customer | undefined {
    this.customers.map((item: Customer) => {
      if (item.id === id) {
        return { ...item, ...updateCustomerDto };
      }
      return item;
    });
    return this.customers.find((customer) => customer.id === id);
  }

  remove(id: number): Customer[] | undefined {
    return this.customers.filter((customer) => customer.id !== id);
  }
}
