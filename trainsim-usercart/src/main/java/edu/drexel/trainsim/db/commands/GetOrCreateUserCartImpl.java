package edu.drexel.trainsim.db.commands;

import com.google.inject.Inject;
import edu.drexel.trainsim.db.models.UserCart;
import edu.drexel.trainsim.db.models.UserCartRequest;
import org.sql2o.Sql2o;

public class GetOrCreateUserCartImpl implements GetOrCreateUserCart {
    private final Sql2o db;

    @Inject
    public GetOrCreateUserCartImpl(Sql2o db) {
        this.db = db;
    }

    @Override
    public UserCart call(UserCartRequest userCartRequest) {
        String sql = "SELECT email, source, target, depart_date, return_date, count_travellers FROM otp.user_cart WHERE email = :email";
        try (var con = this.db.open()) {
            var res = con.createQuery(sql).addParameter("email", userCartRequest.getEmail()).executeAndFetch(UserCart.class);
            if (res.isEmpty()) {
                sql = "INSERT INTO otp.user_cart(email, source, target, depart_date, return_date, count_travellers) " +
                         "VALUES (:email, :source, :target, :depart_date, :return_date, :count_travellers) RETURNING email";
                return con.createQuery(sql)
                        .addParameter("email", userCartRequest.getEmail())
                        .addParameter("source", userCartRequest.getSource())
                        .addParameter("target", userCartRequest.getTarget())
                        .addParameter("depart_date", userCartRequest.getDepart_date())
                        .addParameter("return_date", userCartRequest.getReturn_date())
                        .addParameter("count_travellers", userCartRequest.getCount_travellers())
                        .executeAndFetch(UserCart.class).get(0);
            }
            return res.get(0);
        }
    }
}
