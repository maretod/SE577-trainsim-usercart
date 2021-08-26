package edu.drexel.trainsim.web;

import com.google.inject.Inject;
import edu.drexel.trainsim.db.commands.GetOrCreateUserCart;
import edu.drexel.trainsim.db.models.UserCart;
import edu.drexel.trainsim.db.models.UserCartRequest;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class UsersCartController implements Controller {
    private final GetOrCreateUserCart getOrCreateUserCart;

    @Inject
    public UsersCartController(GetOrCreateUserCart cmd) {
        this.getOrCreateUserCart = cmd;
    }

    @Override
    public void bindRoutes(Javalin app) {
        app.get("/api/usercart", ctx -> this.getUserCartByEmail(ctx));
    }

    private void getUserCartByEmail(Context ctx) {
        var email = ctx.queryParam("email");
        var source = ctx.queryParam("source");
        var target = ctx.queryParam("target");
        var departDate = ctx.queryParam("depart_date");
        var returnDate = ctx.queryParam("return_date");
        var countTravellers = ctx.queryParam("count_travellers");

        ctx.json(getOrCreateUserCart.call(new UserCartRequest(email, source, target, departDate, returnDate, countTravellers)));
    }
}
