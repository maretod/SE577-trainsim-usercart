package edu.drexel.trainsim.db.commands;

import edu.drexel.trainsim.db.models.UserCart;
import edu.drexel.trainsim.db.models.UserCartRequest;

@FunctionalInterface
public interface GetOrCreateUserCart {
    UserCart call(UserCartRequest userCartRequest);
}
