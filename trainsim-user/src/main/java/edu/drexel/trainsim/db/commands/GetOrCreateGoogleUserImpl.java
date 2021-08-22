package edu.drexel.trainsim.db.commands;

import com.google.inject.Inject;

import edu.drexel.trainsim.db.models.User;
import org.sql2o.Sql2o;

public class GetOrCreateGoogleUserImpl implements GetOrCreateGoogleUser {
    private final Sql2o db;

    @Inject
    public GetOrCreateGoogleUserImpl(Sql2o db) {
        this.db = db;
    }

    @Override
    public User call(String email) {
        String sql = "SELECT user_id, email FROM otp.users WHERE email = :email";

        try (var con = this.db.open()) {
            var res = con.createQuery(sql).addParameter("email", email).executeAndFetch(User.class);

            // There is a race condition here if we have more than one servers talking to the db.
            if (res.isEmpty()) {
                sql = "INSERT INTO otp.users(email) VALUES(:email) RETURNING user_id, email";
                return con.createQuery(sql).addParameter("email", email).executeAndFetch(User.class).get(0);
            }

            return res.get(0);
        }
    }
}
